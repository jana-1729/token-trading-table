# Token Trading Table 🚀

A pixel-perfect, high-performance token discovery table built with Next.js 14, featuring real-time price updates, advanced filtering, and responsive design down to 320px.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

### Core Features
- **Real-time Price Updates**: WebSocket-powered live price updates with smooth color transitions
- **Advanced Sorting**: Multi-column sorting with visual indicators
- **Smart Filtering**: Search by name/symbol, filter by status (New Pairs, Final Stretch, Migrated)
- **Interactive UI**: Popovers, tooltips, modals with smooth animations
- **Responsive Design**: Fully responsive from 320px to 4K displays

### Technical Highlights
- ⚡ **Performance Optimized**: Memoized components, virtual scrolling ready, <100ms interactions
- 🎨 **Pixel-Perfect UI**: Dark theme with custom color system, smooth animations
- 🔄 **State Management**: Redux Toolkit for complex state, React Query for data fetching
- ♿ **Accessible**: Radix UI primitives with full keyboard navigation
- 📱 **Mobile-First**: Progressive enhancement with mobile-optimized layouts
- 🎭 **Loading States**: Skeleton loaders, shimmer effects, error boundaries

## 🏗️ Architecture

### Atomic Design Structure
```
components/
├── ui/                    # Atoms - Basic UI components
│   ├── button.tsx
│   ├── badge.tsx
│   ├── tooltip.tsx
│   ├── dialog.tsx
│   ├── popover.tsx
│   ├── input.tsx
│   └── skeleton.tsx
├── tokens/                # Molecules - Token-specific components
│   ├── TokenLogo.tsx
│   ├── PriceChange.tsx
│   ├── TokenBadge.tsx
│   ├── StatusBadge.tsx
│   ├── TokenTableRow.tsx
│   ├── TokenTableHeader.tsx
│   ├── TokenFilters.tsx
│   ├── TokenTable.tsx     # Organism - Complete table
│   ├── TokenDetailsDialog.tsx
│   └── TokenTableSkeleton.tsx
├── providers/             # App providers
│   └── Providers.tsx
├── ErrorBoundary.tsx      # Error handling
└── TokenDiscovery.tsx     # Page template
```

### State Management
- **Redux Toolkit**: Complex state (tokens, filters, websocket)
- **React Query**: Server state, caching, background refetching
- **Local State**: Component-specific UI state

### Data Flow
```
WebSocket → Redux → React Query → Components
     ↓
Price Updates → Smooth Animations → Visual Feedback
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Tech Stack

### Core
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4

### State & Data
- **State Management**: Redux Toolkit 2.0
- **Data Fetching**: TanStack React Query 5.0
- **Real-time**: Custom WebSocket service (mock)

### UI Components
- **Primitives**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 🎨 Design System

### Color Palette
```css
--background: 222.2 84% 4.9%      /* Dark navy */
--foreground: 210 40% 98%         /* Light text */
--primary: 217.2 91.2% 59.8%      /* Blue accent */
--success: 142.1 76.2% 36.3%      /* Green */
--destructive: 0 62.8% 30.6%      /* Red */
--warning: 38 92% 50%             /* Orange */
```

### Responsive Breakpoints
- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1535px
- **Large**: 1536px+

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: 12px, 14px, 16px, 18px, 24px, 32px

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_WS_URL=your_websocket_url
```

### Tailwind Configuration
Custom animations, colors, and utilities in `tailwind.config.ts`

### TypeScript Configuration
Strict mode enabled with path aliases (`@/*`)

## 📊 Performance Optimizations

### Implemented
- ✅ React.memo for expensive components
- ✅ useMemo/useCallback for computed values
- ✅ Code splitting with dynamic imports
- ✅ Image optimization with Next.js Image
- ✅ CSS-in-JS optimization with Tailwind
- ✅ Debounced search input
- ✅ Throttled scroll handlers
- ✅ Lazy loading for modals/dialogs

### Lighthouse Scores Target
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## 🎯 Features Breakdown

### Token Table
- **Columns**: Token, Price, 24h Change, Volume, Market Cap, Liquidity, Holders, Age
- **Sorting**: Click headers to sort ascending/descending/none
- **Filtering**: Status badges, search input
- **Actions**: View details, open explorer, add to watchlist

### Real-time Updates
- **WebSocket Mock**: Simulates price updates every 2-5 seconds
- **Visual Feedback**: Color flash on price change (green up, red down)
- **Smooth Transitions**: 300ms fade animations

### Responsive Behavior
- **320px**: Single column, essential info only
- **640px**: Two columns, show volume/market cap
- **1024px**: Full table with all columns
- **1536px**: Optimized spacing, larger text

## 🧪 Testing

### Manual Testing Checklist
- [ ] All columns sort correctly
- [ ] Search filters tokens by name/symbol
- [ ] Status filters work independently
- [ ] Price updates show visual feedback
- [ ] Modal opens/closes smoothly
- [ ] Tooltips appear on hover
- [ ] Popovers position correctly
- [ ] Responsive layout works 320px-4K
- [ ] Loading states display properly
- [ ] Error boundaries catch errors

## 📱 Responsive Layout Snapshots

### Mobile (320px)
- Vertical card layout
- Essential info only (token, price, change)
- Collapsible actions menu

### Tablet (768px)
- Two-column grid
- Show volume and market cap
- Inline actions

### Desktop (1024px+)
- Full table layout
- All columns visible
- Hover effects and tooltips

## 🔐 Security Considerations

- No sensitive data in client-side code
- Environment variables for API keys
- Input sanitization for search
- XSS protection via React
- HTTPS only in production

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure environment variables
- Enable compression
- Set up CDN for static assets

## 📈 Future Enhancements

- [ ] Add chart visualization (TradingView)
- [ ] Implement user watchlists
- [ ] Add price alerts
- [ ] Export data to CSV
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Advanced filters (price range, volume range)
- [ ] Historical data view
- [ ] Portfolio tracking

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Document complex logic
- Keep components small and focused

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [TanStack Query](https://tanstack.com/query) - Data fetching

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review code comments

---

**Note**: This is a demonstration project showcasing modern React/Next.js development practices. The WebSocket connection is mocked for demonstration purposes.
