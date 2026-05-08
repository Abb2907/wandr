import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Planner from '@/app/planner/page'
import { supabase } from '@/lib/supabase'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  __esModule: true,
  motion: {
    div: ({ children, ...props }: any) => <div {...props} data-testid="motion-div">{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}))

describe('Planner', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the Planner form step 1', () => {
    render(<Planner />)
    const question = screen.getByText(/Where to, explorer\?/i)
    expect(question).toBeInTheDocument()
  })

  it('navigates through all steps and generates itinerary', async () => {
    // Setup Supabase mocks
    const mockActivities = [
      { name: 'Test Activity 1', type: 'nature', duration: '2h', cost: 10 },
      { name: 'Test Activity 2', type: 'food', duration: '1h', cost: 20 },
    ]
    const mockInsert = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        single: jest.fn().mockResolvedValue({ data: { id: 'test-itinerary-id' }, error: null }),
      }),
    })

    ;(supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'knowledge_graph') {
        return { select: jest.fn().mockResolvedValue({ data: mockActivities, error: null }) }
      }
      if (table === 'itineraries') {
        return { insert: mockInsert }
      }
      return {}
    })

    render(<Planner />)

    // Step 1: Destination
    fireEvent.click(screen.getByText('Bali, Indonesia'))
    fireEvent.click(screen.getByText('Continue'))

    // Step 2: Dates & Pace
    expect(screen.getByText(/When & how long\?/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText('Continue'))

    // Step 3: Travelers
    expect(screen.getByText(/Who's coming along\?/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText('Continue'))

    // Step 4: Budget
    expect(screen.getByText(/What's your budget\?/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText('Luxury'))
    fireEvent.click(screen.getByText('Continue'))

    // Step 5: Interests
    expect(screen.getByText(/What excites you\?/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText('Nature'))
    fireEvent.click(screen.getByText('Continue'))

    // Step 6: Transport & Stay
    expect(screen.getByText(/How do you move & sleep\?/i)).toBeInTheDocument()
    
    // Generate Itinerary
    fireEvent.click(screen.getByText(/Generate Itinerary/i))

    // Expect loading state
    expect(screen.getByText(/Building your itinerary/i)).toBeInTheDocument()

    // Wait for supabase interactions
    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('knowledge_graph')
      expect(supabase.from).toHaveBeenCalledWith('itineraries')
    })

    // Verify insert payload
    expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({
      destination: 'Bali, Indonesia',
      budget: 800000,
      interests: ['nature'],
    }))

    // It redirects after 2 seconds, but we can't easily assert the setTimeout without fake timers
  })

  it('handles Supabase errors during generation', async () => {
    // Setup Supabase mocks to fail
    ;(supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'knowledge_graph') {
        return { select: jest.fn().mockResolvedValue({ data: null, error: new Error('Failed to load') }) }
      }
      return {}
    })

    render(<Planner />)

    // Skip to step 6 (mocking state directly isn't possible, so we click through)
    for (let i = 1; i <= 5; i++) {
      fireEvent.click(screen.getByText('Continue'))
    }
    
    fireEvent.click(screen.getByText(/Generate Itinerary/i))

    // It should eventually revert out of generating state or log error
    // We expect the catch block to be hit and console.error called
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error creating itinerary:', expect.any(Error))
    })
    
    consoleSpy.mockRestore()
  })
})
