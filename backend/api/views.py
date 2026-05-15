from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from django.core.mail import send_mail
from django.conf import settings
from .models import (HeroContent, SiteLogo, AboutContent, Service, Product, PageHero, 
                     ContactEnquiry, ChargingStation, Offer, GalleryImage, TestDriveEnquiry,
                     ChatbotFAQ, ChatSession, ChatMessage, CustomerReview, OwnerMessage, TeamMember, Journey, JourneyGallery,
                     CompanyVision, CompanyMission, CompanyGoal, FuturePlan, CompanyHistory)
from .serializers import (HeroContentSerializer, SiteLogoSerializer, AboutContentSerializer, ServiceSerializer, 
                          ProductSerializer, PageHeroSerializer, ContactEnquirySerializer,
                          ChargingStationSerializer, OfferSerializer, GalleryImageSerializer, TestDriveEnquirySerializer,
                          ChatbotFAQSerializer, ChatSessionSerializer, ChatMessageSerializer, CustomerReviewSerializer,
                          OwnerMessageSerializer, TeamMemberSerializer, JourneySerializer,
                          CompanyVisionSerializer, CompanyMissionSerializer, CompanyGoalSerializer, FuturePlanSerializer, CompanyHistorySerializer)
from .pagination import StandardResultsSetPagination
import uuid


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit objects.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class IsAdmin(permissions.BasePermission):
    """
    Custom permission to only allow admins.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

@api_view(['GET'])
def hero_content(request):
    heroes = HeroContent.objects.filter(is_active=True).order_by('order', 'id')
    if heroes.exists():
        serializer = HeroContentSerializer(heroes, many=True, context={'request': request})
        return Response(serializer.data)
    return Response([])

@api_view(['GET'])
def site_logo(request):
    logo = SiteLogo.objects.filter(is_active=True).first()
    if logo:
        serializer = SiteLogoSerializer(logo, context={'request': request})
        return Response(serializer.data)
    return Response({})

@api_view(['GET'])
def about_content(request):
    about = AboutContent.objects.first()
    if about:
        serializer = AboutContentSerializer(about, context={'request': request})
        return Response(serializer.data)
    return Response({})

@api_view(['GET'])
def page_hero(request, page):
    try:
        hero = PageHero.objects.get(page=page)
        serializer = PageHeroSerializer(hero, context={'request': request})
        return Response(serializer.data)
    except PageHero.DoesNotExist:
        return Response({}, status=status.HTTP_404_NOT_FOUND)

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'title']
    ordering = ['order']


class ChargingStationViewSet(viewsets.ModelViewSet):
    queryset = ChargingStation.objects.all()
    serializer_class = ChargingStationSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['district', 'charging_type']
    ordering_fields = ['order', 'name', 'district']
    ordering = ['order']


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category', 'is_featured']
    ordering_fields = ['created_at', 'name', 'price']
    ordering = ['-created_at']


class OfferViewSet(viewsets.ModelViewSet):
    queryset = Offer.objects.filter(is_active=True)
    serializer_class = OfferSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'created_at']
    ordering = ['order']


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category', 'media_type']
    ordering_fields = ['order', 'created_at']
    ordering = ['order']


class ContactEnquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    ordering = ['-created_at']
    
    def get_queryset(self):
        # Only admins can view all inquiries
        if self.request.user and self.request.user.is_staff:
            return ContactEnquiry.objects.all()
        # Non-admins can only create
        return ContactEnquiry.objects.none()
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [IsAdmin()]
    
    def perform_create(self, serializer):
        instance = serializer.save()
        
        # Send email notification
        try:
            subject = f'New Contact Enquiry: {instance.subject}'
            message = f"""
New Contact Enquiry Received

Name: {instance.name}
Email: {instance.email}
Phone: {instance.phone}
Subject: {instance.subject}

Message:
{instance.message}

---
This is an automated notification from Shubhayaan EV Website.
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Error sending email: {e}")


class TestDriveEnquiryViewSet(viewsets.ModelViewSet):
    queryset = TestDriveEnquiry.objects.all()
    serializer_class = TestDriveEnquirySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at', 'preferred_date']
    ordering = ['-created_at']
    
    def get_queryset(self):
        # Only admins can view all bookings
        if self.request.user and self.request.user.is_staff:
            return TestDriveEnquiry.objects.all()
        # Non-admins can only create
        return TestDriveEnquiry.objects.none()
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [IsAdmin()]
    
    def perform_create(self, serializer):
        instance = serializer.save()
        
        # Send email notification
        try:
            subject = f'New Test Drive Request: {instance.vehicle_interest}'
            message = f"""
New Test Drive Request Received

Name: {instance.name}
Email: {instance.email if instance.email else 'Not provided'}
Phone: {instance.phone}
Vehicle Interest: {instance.vehicle_interest}
Preferred Date: {instance.preferred_date.strftime('%B %d, %Y')}
Preferred Time: {instance.preferred_time.strftime('%I:%M %p')}

Additional Message:
{instance.message if instance.message else 'No additional message'}

---
This is an automated notification from Shubhayaan EV Website.
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Error sending email: {e}")

class ChatbotFAQViewSet(viewsets.ModelViewSet):
    queryset = ChatbotFAQ.objects.filter(is_active=True)
    serializer_class = ChatbotFAQSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'created_at']
    ordering = ['order']

@api_view(['POST'])
def create_chat_session(request):
    session_id = str(uuid.uuid4())
    session = ChatSession.objects.create(
        session_id=session_id,
        user_name=request.data.get('user_name', ''),
        user_email=request.data.get('user_email', '')
    )
    serializer = ChatSessionSerializer(session)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_chat_session(request, session_id):
    try:
        session = ChatSession.objects.get(session_id=session_id)
        serializer = ChatSessionSerializer(session)
        return Response(serializer.data)
    except ChatSession.DoesNotExist:
        return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def send_message(request, session_id):
    try:
        session = ChatSession.objects.get(session_id=session_id)
        message = ChatMessage.objects.create(
            session=session,
            message_type=request.data.get('message_type', 'user'),
            message=request.data.get('message', '')
        )
        serializer = ChatMessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except ChatSession.DoesNotExist:
        return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

class CustomerReviewViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerReviewSerializer
    parser_classes = (MultiPartParser, FormParser)
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['rating', 'status']
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']
    
    def get_queryset(self):
        # For GET requests, only return approved reviews
        if self.request.method == 'GET':
            return CustomerReview.objects.filter(status='approved')
        # For POST requests (creating), return all
        return CustomerReview.objects.all()
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAdmin()]
        return [permissions.AllowAny()]
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

@api_view(['GET'])
def owner_message(request):
    message = OwnerMessage.objects.filter(is_active=True).first()
    if message:
        serializer = OwnerMessageSerializer(message, context={'request': request})
        return Response(serializer.data)
    return Response({})

class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['team_type', 'is_active']
    ordering_fields = ['order', 'team_type', 'name']
    ordering = ['team_type', 'order']
    
    def get_queryset(self):
        queryset = TeamMember.objects.filter(is_active=True)
        return queryset
    
    def get_serializer_context(self):
        return {'request': self.request}


class JourneyViewSet(viewsets.ModelViewSet):
    queryset = Journey.objects.filter(is_active=True)
    serializer_class = JourneySerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'created_at']
    ordering = ['order']
    
    def get_serializer_context(self):
        return {'request': self.request}


@api_view(['GET'])
def company_vision(request):
    visions = CompanyVision.objects.filter(is_active=True).order_by('order')
    serializer = CompanyVisionSerializer(visions, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def company_mission(request):
    missions = CompanyMission.objects.filter(is_active=True).order_by('order')
    serializer = CompanyMissionSerializer(missions, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def company_goals(request):
    goals = CompanyGoal.objects.filter(is_active=True).order_by('order')
    serializer = CompanyGoalSerializer(goals, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def future_plans(request):
    plans = FuturePlan.objects.filter(is_active=True).order_by('order')
    serializer = FuturePlanSerializer(plans, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def company_history(request):
    history = CompanyHistory.objects.filter(is_active=True).order_by('order', 'year')
    serializer = CompanyHistorySerializer(history, many=True, context={'request': request})
    return Response(serializer.data)
