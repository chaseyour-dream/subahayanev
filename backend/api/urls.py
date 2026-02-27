from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (hero_content, site_logo, about_content, page_hero, ServiceViewSet, ProductViewSet, 
                    ContactEnquiryViewSet, ChargingStationViewSet, 
                    OfferViewSet, GalleryImageViewSet, TestDriveEnquiryViewSet,
                    ChatbotFAQViewSet, create_chat_session, get_chat_session, send_message, CustomerReviewViewSet,
                    owner_message, TeamMemberViewSet, JourneyViewSet)

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'charging-stations', ChargingStationViewSet)
router.register(r'products', ProductViewSet)
router.register(r'offers', OfferViewSet)
router.register(r'gallery', GalleryImageViewSet)
router.register(r'contact-enquiry', ContactEnquiryViewSet)
router.register(r'test-drive-enquiry', TestDriveEnquiryViewSet)
router.register(r'chatbot-faq', ChatbotFAQViewSet)
router.register(r'reviews', CustomerReviewViewSet, basename='reviews')
router.register(r'team-members', TeamMemberViewSet, basename='team-members')
router.register(r'journey', JourneyViewSet, basename='journey')

urlpatterns = [
    path('hero/', hero_content, name='hero-content'),
    path('logo/', site_logo, name='site-logo'),
    path('about/', about_content, name='about-content'),
    path('owner-message/', owner_message, name='owner-message'),
    path('page-hero/<str:page>/', page_hero, name='page-hero'),
    path('chat/session/', create_chat_session, name='create-chat-session'),
    path('chat/session/<str:session_id>/', get_chat_session, name='get-chat-session'),
    path('chat/session/<str:session_id>/message/', send_message, name='send-message'),
    path('', include(router.urls)),
]
