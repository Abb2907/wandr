import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dashboard from '@/app/dashboard/page'
import { supabase } from '@/lib/supabase'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue('test-itinerary-id'),
  }),
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}))

// Mock fetch for chat
global.fetch = jest.fn()

// Mock framer-motion
jest.mock('framer-motion', () => ({
  __esModule: true,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

describe('Dashboard', () => {
  const mockItineraryData = {
    id: 'test-itinerary-id',
    destination: 'Test Destination',
    duration: 3,
    budget: 160000,
    plan: {
      days: [
        {
          theme: 'Test Theme 1',
          activities: [
            { name: 'Test Activity 1', type: 'nature', cost: 100, time: '09:00', duration: '2h' },
          ],
        },
        {
          theme: 'Test Theme 2',
          activities: [
            { name: 'Test Activity 2', type: 'culture', cost: 200, time: '10:00', duration: '3h' },
          ],
        },
        {
          theme: 'Test Theme 3',
          activities: [
            { name: 'Test Activity 3', type: 'food', cost: 300, time: '20:00', duration: '1h' },
          ],
        },
      ],
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: mockItineraryData, error: null }),
        }),
      }),
    })
  })

  it('renders loading state initially', () => {
    // Override to never resolve
    ;(supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockReturnValue(new Promise(() => {})),
        }),
      }),
    })

    render(<Dashboard />)
    expect(screen.getByText(/Loading your customized itinerary/i)).toBeInTheDocument()
  })

  it('renders the Dashboard with loaded data', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    // Core UI elements
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    // Destination shown in header
    expect(screen.getAllByText(/Test Destination/i).length).toBeGreaterThan(0)
    // Theme from parsedPlan
    expect(screen.getByText(/Test Theme 1/i)).toBeInTheDocument()
    // Activity from parsedPlan
    expect(screen.getByText(/Test Activity 1/i)).toBeInTheDocument()
  })

  it('renders sidebar navigation items', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    // Check sidebar nav labels
    expect(screen.getByText('Itinerary')).toBeInTheDocument()
    expect(screen.getByText('Map View')).toBeInTheDocument()
    expect(screen.getByText('Budget')).toBeInTheDocument()
    expect(screen.getByText('Alerts')).toBeInTheDocument()
  })

  it('handles Supabase errors gracefully', async () => {
    ;(supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Database error' } }),
        }),
      }),
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText(/Could not load custom itinerary/i)).toBeInTheDocument()
      expect(screen.getByText(/Database error/i)).toBeInTheDocument()
    })
  })

  it('shows fallback demo content on error', async () => {
    ;(supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Network error' } }),
        }),
      }),
    })

    render(<Dashboard />)

    await waitFor(() => {
      // Should still show the dashboard with static/demo data
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })
  })

  it('can switch between days', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    // Day 1 should be active by default - Test Theme 1 shown
    expect(screen.getByText('Test Theme 1')).toBeInTheDocument()

    // Click Day 2 - use getAllByText if multiple matches, or be more specific
    const day2Buttons = screen.getAllByText('Day 2')
    fireEvent.click(day2Buttons[0])

    await waitFor(() => {
      expect(screen.getByText('Test Theme 2')).toBeInTheDocument()
    })
  })

  it('can open and close the chat drawer', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    // Chat drawer should not be open initially
    expect(screen.queryByText(/Wandr AI Concierge/i)).not.toBeInTheDocument()

    // Click "Ask Wandr" button to open chat
    fireEvent.click(screen.getByLabelText(/Ask Wandr AI concierge/i))

    // Chat drawer should now be open
    // There might be multiple instances (header and messages), so we check if at least one exists
    expect(screen.getAllByText(/Wandr AI Concierge/i).length).toBeGreaterThan(0)
    expect(screen.getByPlaceholderText(/Ask anything about your trip/i)).toBeInTheDocument()

    // Close chat with X button
    fireEvent.click(screen.getByLabelText(/Close chat/i))
  })

  it('can send a chat message', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ reply: 'Mock AI response' }),
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    // Open chat
    fireEvent.click(screen.getByLabelText(/Ask Wandr AI concierge/i))

    // Type a message
    const chatInput = screen.getByPlaceholderText(/Ask anything about your trip/i)
    fireEvent.change(chatInput, { target: { value: 'Hello AI' } })
    fireEvent.keyDown(chatInput, { key: 'Enter', code: 'Enter' })

    // User message should appear
    await waitFor(() => {
      expect(screen.getByText('Hello AI')).toBeInTheDocument()
    })

    // AI response should appear
    await waitFor(() => {
      expect(screen.getByText('Mock AI response')).toBeInTheDocument()
    })
  })

  it('handles chat API failures gracefully', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText(/Ask Wandr AI concierge/i))
    const chatInput = screen.getByPlaceholderText(/Ask anything about your trip/i)
    fireEvent.change(chatInput, { target: { value: 'Test message' } })
    fireEvent.keyDown(chatInput, { key: 'Enter', code: 'Enter' })

    await waitFor(() => {
      expect(screen.getByText(/Failed to connect to Wandr AI/i)).toBeInTheDocument()
    })
  })

  it('can trigger chaos/disruption mode', async () => {
    // Use null itineraryId mock to test chaos mode on static demo
    jest.mock('next/navigation', () => ({
      useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
      useSearchParams: () => ({ get: jest.fn().mockReturnValue(null) }),
    }))

    ;(supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: mockItineraryData, error: null }),
        }),
      }),
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    // Find the "Simulate Disruption" button in Quick Actions
    const simulateButton = screen.getByText(/Simulate Disruption/i)
    expect(simulateButton).toBeInTheDocument()
    fireEvent.click(simulateButton)
  })

  it('renders Quick Actions section', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText('Quick Actions')).toBeInTheDocument()
    expect(screen.getByText('Simulate Disruption')).toBeInTheDocument()
    expect(screen.getByText('Add activity')).toBeInTheDocument()
    expect(screen.getByText('Find restaurants nearby')).toBeInTheDocument()
  })

  it('renders budget tracker with correct data', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText('Budget Tracker')).toBeInTheDocument()
    expect(screen.getByText('Spent so far')).toBeInTheDocument()
    expect(screen.getByText('Accommodation')).toBeInTheDocument()
  })

  it('renders Live Alerts section', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText('Live Alerts')).toBeInTheDocument()
  })

  it('renders weather forecast', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText('7-Day Forecast')).toBeInTheDocument()
  })

  it('shows AI Active status indicator', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.queryByText(/Loading your customized itinerary/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText('AI Active')).toBeInTheDocument()
  })
})
