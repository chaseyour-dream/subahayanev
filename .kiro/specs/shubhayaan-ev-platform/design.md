# Shubhayaan EV Platform - Design Document

## Overview

The Shubhayaan EV Platform is a full-stack web application designed to showcase electric vehicle products, manage service locations, facilitate customer engagement, and provide administrative content management capabilities. The platform follows a modern architecture with a Django REST Framework backend and Next.js frontend, enabling responsive user experiences across all devices.

The design prioritizes:
- **User Experience**: Intuitive navigation and fast page loads
- **Content Management**: Easy admin panel for non-technical users
- **Data Integrity**: Robust validation and error handling
- **Scalability**: Modular architecture supporting future expansion
- **Performance**: Optimized queries and caching strategies

## Architecture

### Technology Stack

**Backend:**
- **Framework**: Django 4.x with Django REST Framework
- **Database**: PostgreSQL (production) / SQLite (development)
- **Authentication**: Django built-in auth + token-based for API
- **File Storage**: Django FileField with local/cloud storage support
- **API Documentation**: DRF browsable API

**Frontend:**
- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React hooks and context API
- **HTTP Client**: Fetch API with custom hooks
- **UI Components**: Custom components + React Icons

**Infrastructure:**
- **Deployment**: Docker containerization ready
- **Web Server**: Gunicorn (backend) + Vercel/Node (frontend)
- **Static Files**: CDN-ready with proper caching headers
- **Environment**: Environment-based configuration

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (Next.js)                   │
│  ┌──────────────┬──────────────┬──────────────┐              │
│  │   Pages      │  Components  │   Hooks      │              │
│  │  (Home,      │  (Hero,      │  (useFetch,  │              │
│  │   Products,  │   Products,  │   useAuth)   │              │
│  │   Services)  │   Reviews)   │              │              │
│  └──────────────┴──────────────┴──────────────┘              │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTP/REST
┌────────────────────────▼─────────────────────────────────────┐
│                  API Layer (Django REST)                      │
│  ┌──────────────┬──────────────┬──────────────┐              │
│  │  Endpoints   │  Serializers │  Permissions │              │
│  │  (Products,  │  (Transform  │  (Auth,      │              │
│  │   Services,  │   models to   │   Admin)     │              │
│  │   Reviews)   │   JSON)       │              │              │
│  └──────────────┴──────────────┴──────────────┘              │
└────────────────────────┬─────────────────────────────────────┘
                         │ ORM
┌────────────────────────▼─────────────────────────────────────┐
│                  Data Layer (Django Models)                   │
│  ┌──────────────┬──────────────┬──────────────┐              │
│  │   Products   │   Services   │   Reviews    │              │
│  │   Charging   │   Team       │   Journey    │              │
│  │   Stations   │   Messages   │   Gallery    │              │
│  └──────────────┴──────────────┴──────────────┘              │
└────────────────────────┬─────────────────────────────────────┘
                         │ SQL
┌────────────────────────▼─────────────────────────────────────┐
│                  Database (PostgreSQL)                        │
│  Tables for all models with proper indexing and constraints  │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### Frontend Components

**Layout Components:**
- `Navbar`: Navigation with logo, menu items, and responsive hamburger
- `Footer`: Footer with links, social media, and contact info
- `Layout`: Wrapper component for consistent page structure

**Page Components:**
- `Home` (page.tsx): Landing page with hero, services, products, reviews
- `Products` (products/page.tsx): Product listing and detail pages
- `Services` (services/page.tsx): Service locations and details
- `ChargingStations` (charging-stations/page.tsx): Charging station directory
- `Journey` (journey/page.tsx): Company journey and milestones
- `About` (about/page.tsx): About company page
- `Contact` (contact/page.tsx): Contact form and information
- `Gallery` (gallery/page.tsx): Image and video gallery
- `TestDrive` (test-drive/page.tsx): Test drive booking

**Feature Components:**
- `HeroSection`: Hero banner with media
- `ProductsSection`: Product showcase with cards
- `ServicesSection`: Service categories and locations
- `ChargingStationsSection`: Charging station listings
- `CustomerReviews`: Review display and submission
- `AccordionGallery`: Expandable gallery by category
- `ContactSection`: Contact form
- `Chatbot`: FAQ chatbot interface
- `TestDriveSection`: Test drive booking form

### Backend API Endpoints

**Products:**
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `POST /api/products/` - Create product (admin)
- `PUT /api/products/{id}/` - Update product (admin)
- `DELETE /api/products/{id}/` - Delete product (admin)

**Services:**
- `GET /api/services/` - List all services
- `GET /api/services/{id}/` - Get service details
- `GET /api/services/{id}/locations/` - Get service locations
- `POST /api/services/` - Create service (admin)
- `PUT /api/services/{id}/` - Update service (admin)

**Charging Stations:**
- `GET /api/charging-stations/` - List all charging stations
- `GET /api/charging-stations/{id}/` - Get station details
- `POST /api/charging-stations/` - Create station (admin)
- `PUT /api/charging-stations/{id}/` - Update station (admin)

**Reviews:**
- `GET /api/reviews/` - List approved reviews
- `POST /api/reviews/` - Submit new review
- `GET /api/reviews/{id}/` - Get review details
- `PUT /api/reviews/{id}/` - Update review status (admin)

**Inquiries:**
- `POST /api/contact-enquiries/` - Submit contact inquiry
- `GET /api/contact-enquiries/` - List inquiries (admin)
- `POST /api/test-drive-enquiries/` - Submit test drive booking
- `GET /api/test-drive-enquiries/` - List bookings (admin)

**Content:**
- `GET /api/hero-content/` - Get hero content
- `GET /api/about-content/` - Get about content
- `GET /api/team-members/` - Get team members
- `GET /api/journey/` - Get journey milestones
- `GET /api/gallery/` - Get gallery images/videos
- `GET /api/owner-message/` - Get owner message

**Admin:**
- `GET /api/admin/dashboard/` - Dashboard statistics
- `GET /api/admin/analytics/` - Analytics data

## Data Models

### Core Models

**Product**
```
- id: UUID (primary key)
- name: String (max 200)
- category: Choice (kaweii, nevko)
- description: Text
- price: String
- specifications: Text
- image: ImageField
- battery_capacity: String
- model: String
- range_per_charge: String
- charging_time: String
- top_speed: String
- seating_capacity: String
- is_featured: Boolean
- created_at: DateTime
```

**Service**
```
- id: UUID (primary key)
- title: String (max 200)
- description: Text
- icon: Choice (charging, showroom, service, restaurant)
- image: ImageField
- order: Integer
- locations: Relationship (ServiceLocationDetail)
```

**ServiceLocationDetail**
```
- id: UUID (primary key)
- service: ForeignKey (Service)
- location_name: String (max 200)
- address: Text
- city: String
- district: String
- contact_person: String
- contact_phone: String
- charging_type: Choice (none, fast, moderate, slow)
- washing_facility: Boolean
- image: ImageField
- order: Integer
```

**ChargingStation**
```
- id: UUID (primary key)
- name: String (max 200)
- location: String
- district: String
- description: Text
- image: ImageField
- charging_type: Choice (fast, moderate, slow)
- washing_facility: Boolean
- contact_person: String
- contact_phone: String
- map_embed_code: Text
- order: Integer
```

**CustomerReview**
```
- id: UUID (primary key)
- client_name: String (max 200)
- model_selected: String
- photo: ImageField
- review_description: Text
- rating: Integer (1-5)
- status: Choice (pending, approved, rejected)
- created_at: DateTime
- updated_at: DateTime
```

**ContactEnquiry**
```
- id: UUID (primary key)
- name: String (max 200)
- email: EmailField
- phone: String
- subject: String
- message: Text
- created_at: DateTime
```

**TestDriveEnquiry**
```
- id: UUID (primary key)
- name: String (max 200)
- email: EmailField
- phone: String
- preferred_date: DateField
- preferred_time: TimeField
- vehicle_interest: String
- message: Text
- created_at: DateTime
```

**Journey**
```
- id: UUID (primary key)
- title: String (max 200)
- short_description: String (max 300)
- description: Text
- cover_image: ImageField
- order: Integer
- is_active: Boolean
- created_at: DateTime
- gallery_images: Relationship (JourneyGallery)
```

**JourneyGallery**
```
- id: UUID (primary key)
- journey: ForeignKey (Journey)
- image: ImageField
- caption: String
- order: Integer
```

**TeamMember**
```
- id: UUID (primary key)
- name: String (max 200)
- designation: String
- team_type: Choice (board, technical)
- description: String (max 200)
- email: EmailField
- phone: String
- photo: ImageField
- order: Integer
- is_active: Boolean
```

**OwnerMessage**
```
- id: UUID (primary key)
- owner_name: String (max 200)
- owner_title: String
- message: Text
- photo: ImageField
- is_active: Boolean
- created_at: DateTime
```

**ChatSession**
```
- id: UUID (primary key)
- session_id: String (unique)
- user_name: String
- user_email: String
- is_active: Boolean
- created_at: DateTime
- updated_at: DateTime
- messages: Relationship (ChatMessage)
```

**ChatMessage**
```
- id: UUID (primary key)
- session: ForeignKey (ChatSession)
- message_type: Choice (user, bot, admin)
- message: Text
- created_at: DateTime
```

**GalleryImage**
```
- id: UUID (primary key)
- title: String (max 200)
- description: Text
- category: Choice (kaweii, nevko, general)
- media_type: Choice (image, video)
- image: ImageField
- video: FileField
- order: Integer
- created_at: DateTime
```

## UI/UX Design Specifications

### Design System

**Color Palette:**
- Primary: #1a1a1a (Dark)
- Secondary: #4a4a4a (Gray)
- Accent: #25D366 (Green - WhatsApp)
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444

**Typography:**
- Headings: Bold, 24-48px
- Body: Regular, 14-16px
- Captions: Light, 12-14px

**Spacing:**
- Base unit: 8px
- Padding: 16px, 24px, 32px
- Margins: 16px, 24px, 32px, 48px

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Key Pages

**Home Page:**
- Hero section with video/image background
- Services overview with icons
- Featured products carousel
- Charging stations preview
- Customer reviews section
- Test drive CTA
- Chatbot widget

**Products Page:**
- Product grid with filters (category, price)
- Product cards with image, name, price
- Detail page with full specifications
- Comparison feature
- Related products

**Services Page:**
- Service categories with icons
- Location listings with maps
- Facility information display
- Contact details
- Directions link

**Charging Stations Page:**
- Station directory with search
- Map view with markers
- Station details with facilities
- Contact information
- Directions

**Journey Page:**
- Timeline of company milestones
- Milestone cards with images
- Gallery for each milestone
- Company values section

**About Page:**
- Company overview
- Team members (board + technical)
- Owner message
- Company values
- Contact information

**Contact Page:**
- Contact form
- Company information
- Social media links
- Map with location

**Gallery Page:**
- Image/video grid
- Category filters
- Lightbox viewer
- Video player

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Product Display Completeness
*For any* product in the database, when fetched via the API, the response SHALL include all required fields (name, category, description, price, specifications, image URL).
**Validates: Requirements 1.1, 1.2, 1.3**

### Property 2: Service Location Information Completeness
*For any* service location in the database, when displayed on the frontend, the response SHALL include facility information (charging_type, washing_facility) and contact details (contact_person, contact_phone).
**Validates: Requirements 2.2, 2.3**

### Property 3: Location-Based Search Accuracy
*For any* search query with a city/district filter, the returned service locations SHALL only include locations matching the specified city or district.
**Validates: Requirements 2.4**

### Property 4: Distance Calculation Correctness
*For any* two geographic coordinates (user location and service location), the calculated distance SHALL be within 0.1km of the actual distance using the Haversine formula.
**Validates: Requirements 2.5**

### Property 5: Form Input Validation
*For any* form submission (contact, test drive, review), if required fields are empty or invalid (e.g., invalid email format), the submission SHALL be rejected and an error message SHALL be displayed.
**Validates: Requirements 3.2**

### Property 6: Inquiry Persistence
*For any* submitted contact inquiry, when queried from the database immediately after submission, the inquiry data SHALL match the submitted data exactly (round-trip property).
**Validates: Requirements 3.4**

### Property 7: Test Drive Slot Availability
*For any* test drive booking request, only future dates and times (after current timestamp) SHALL be available for selection.
**Validates: Requirements 4.2**

### Property 8: Review Approval Workflow
*For any* newly submitted review, the initial status SHALL be 'pending', and only after admin approval SHALL the status change to 'approved' and the review become visible to users.
**Validates: Requirements 5.1, 5.2, 5.3**

### Property 9: Review Display Completeness
*For any* approved review displayed on the frontend, the response SHALL include customer name, rating, review date, and review content.
**Validates: Requirements 5.4, 5.5**

### Property 10: Review Filtering and Sorting
*For any* set of reviews, when filtered by rating or sorted by date, the returned results SHALL maintain the correct order and only include reviews matching the filter criteria.
**Validates: Requirements 5.6**

### Property 11: Product CRUD Operations
*For any* product creation, update, or deletion operation by an admin, the database state SHALL reflect the operation correctly (create adds new record, update modifies existing record, delete removes record).
**Validates: Requirements 6.1**

### Property 12: Service Location CRUD Operations
*For any* service location creation, update, or deletion operation by an admin, the database state SHALL reflect the operation correctly.
**Validates: Requirements 6.2**

### Property 13: Review Moderation
*For any* review moderation action (approve/reject), the review status SHALL be updated correctly and visibility SHALL change accordingly.
**Validates: Requirements 6.3**

### Property 14: Team Member CRUD Operations
*For any* team member creation, update, or deletion operation by an admin, the database state SHALL reflect the operation correctly.
**Validates: Requirements 6.4**

### Property 15: Journey Content CRUD Operations
*For any* journey milestone creation, update, or deletion operation by an admin, the database state SHALL reflect the operation correctly.
**Validates: Requirements 6.5**

## Error Handling

### Client-Side Error Handling

**Form Validation Errors:**
- Display inline error messages for invalid fields
- Highlight invalid fields with red border
- Prevent form submission until all errors resolved
- Show specific error messages (e.g., "Invalid email format")

**API Error Handling:**
- Display user-friendly error messages for API failures
- Retry failed requests with exponential backoff
- Show loading states during requests
- Handle network timeouts gracefully

**Image Loading Errors:**
- Display placeholder image if image fails to load
- Show fallback text if image unavailable
- Log errors for debugging

### Server-Side Error Handling

**Validation Errors:**
- Return 400 Bad Request with detailed error messages
- Validate all inputs before processing
- Check data types, lengths, and formats

**Authentication Errors:**
- Return 401 Unauthorized for missing/invalid tokens
- Return 403 Forbidden for insufficient permissions
- Redirect to login page on frontend

**Database Errors:**
- Log database errors for debugging
- Return 500 Internal Server Error with generic message
- Implement transaction rollback on failures

**File Upload Errors:**
- Validate file type and size before upload
- Return 413 Payload Too Large if file exceeds limit
- Return 415 Unsupported Media Type for invalid formats

## Testing Strategy

### Unit Testing

**Backend Unit Tests:**
- Model validation tests (test constraints, defaults)
- Serializer tests (test data transformation)
- View/API endpoint tests (test request/response)
- Permission tests (test authentication/authorization)
- Utility function tests

**Frontend Unit Tests:**
- Component rendering tests
- Event handler tests
- Hook tests (custom React hooks)
- Utility function tests

### Property-Based Testing

**Property Test Configuration:**
- Minimum 100 iterations per property test
- Use hypothesis (Python) for backend properties
- Use fast-check (JavaScript) for frontend properties
- Tag each test with feature and property reference

**Backend Property Tests:**
- Test data model invariants
- Test API response completeness
- Test CRUD operation correctness
- Test validation logic
- Test filtering and sorting

**Frontend Property Tests:**
- Test component rendering with various props
- Test form validation
- Test data transformation
- Test API integration

### Integration Testing

**End-to-End Flows:**
- Product browsing flow
- Service location search flow
- Inquiry submission flow
- Test drive booking flow
- Review submission and approval flow

**API Integration:**
- Test API endpoints with real database
- Test authentication and authorization
- Test error handling
- Test data consistency

### Performance Testing

**Load Testing:**
- Test API endpoints under load
- Measure response times
- Identify bottlenecks

**Frontend Performance:**
- Measure page load times
- Test with slow network conditions
- Optimize images and assets

## Security Considerations

### Authentication & Authorization

**Backend:**
- Use Django's built-in authentication
- Implement token-based auth for API
- Validate all requests for authentication
- Check permissions for admin operations

**Frontend:**
- Store auth tokens securely (httpOnly cookies)
- Implement logout functionality
- Redirect to login on 401 errors

### Data Protection

**Input Validation:**
- Validate all user inputs on both client and server
- Sanitize inputs to prevent XSS attacks
- Use parameterized queries to prevent SQL injection

**File Uploads:**
- Validate file types and sizes
- Store files outside web root
- Generate random filenames
- Scan uploads for malware

**HTTPS:**
- Use HTTPS for all communications
- Implement HSTS headers
- Use secure cookies

### Admin Panel Security

**Access Control:**
- Require authentication for admin panel
- Implement role-based access control
- Log all admin actions
- Implement rate limiting on login attempts

**CSRF Protection:**
- Use Django's CSRF middleware
- Validate CSRF tokens on state-changing requests

## Performance Optimization

### Backend Optimization

**Database:**
- Create indexes on frequently queried fields
- Use select_related() for foreign keys
- Use prefetch_related() for reverse relations
- Implement query caching

**API:**
- Implement pagination for list endpoints
- Use response compression (gzip)
- Implement rate limiting
- Cache static responses

### Frontend Optimization

**Asset Optimization:**
- Compress images (WebP format)
- Minify CSS and JavaScript
- Implement code splitting
- Use lazy loading for images

**Caching:**
- Implement browser caching headers
- Use service workers for offline support
- Cache API responses

**Rendering:**
- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Optimize re-renders

## Deployment Architecture

### Development Environment
- Local Django development server
- Local Next.js development server
- SQLite database
- Local file storage

### Production Environment
- Gunicorn WSGI server (backend)
- Vercel or similar (frontend)
- PostgreSQL database
- Cloud storage (AWS S3 or similar)
- CDN for static assets
- Docker containerization

### CI/CD Pipeline
- Automated tests on pull requests
- Code quality checks (linting, type checking)
- Automated deployment on merge to main
- Database migrations on deployment

