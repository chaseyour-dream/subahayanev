from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import (HeroContent, SiteLogo, AboutContent, Service, Product, PageHero, 
                     ContactEnquiry, ChargingStation, Offer, GalleryImage, TestDriveEnquiry,
                     ChatbotFAQ, ChatSession, ChatMessage, CustomerReview, OwnerMessage, TeamMember, Journey, JourneyGallery)
from .serializers import (HeroContentSerializer, SiteLogoSerializer, AboutContentSerializer, ServiceSerializer, 
                          ProductSerializer, PageHeroSerializer, ContactEnquirySerializer,
                          ChargingStationSerializer, OfferSerializer, GalleryImageSerializer, TestDriveEnquirySerializer,
                          ChatbotFAQSerializer, ChatSessionSerializer, ChatMessageSerializer, CustomerReviewSerializer,
                          OwnerMessageSerializer, TeamMemberSerializer, JourneySerializer)
import uuid

@api_view(['GET'])
def hero_content(request):
    hero = HeroContent.objects.filter(is_active=True).first()
    if hero:
        serializer = HeroContentSerializer(hero, context={'request': request})
        return Response(serializer.data)
    return Response({})

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

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ChargingStationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ChargingStation.objects.all()
    serializer_class = ChargingStationSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset

class OfferViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Offer.objects.filter(is_active=True)
    serializer_class = OfferSerializer

class GalleryImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    
    def get_queryset(self):
        queryset = GalleryImage.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset

class ContactEnquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer
    http_method_names = ['post']

class TestDriveEnquiryViewSet(viewsets.ModelViewSet):
    queryset = TestDriveEnquiry.objects.all()
    serializer_class = TestDriveEnquirySerializer
    http_method_names = ['post']

class ChatbotFAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ChatbotFAQ.objects.filter(is_active=True)
    serializer_class = ChatbotFAQSerializer

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
    
    def get_queryset(self):
        # For GET requests, only return approved reviews
        if self.request.method == 'GET':
            return CustomerReview.objects.filter(status='approved')
        # For POST requests (creating), return all
        return CustomerReview.objects.all()
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    def create(self, request, *args, **kwargs):
        print("=== Review Creation Debug ===")
        print("Request data:", request.data)
        print("Request files:", request.FILES)
        print("Photo in files:", 'photo' in request.FILES)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        print("Created review ID:", serializer.instance.id)
        print("Photo saved:", serializer.instance.photo)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

@api_view(['GET'])
def owner_message(request):
    message = OwnerMessage.objects.filter(is_active=True).first()
    if message:
        serializer = OwnerMessageSerializer(message, context={'request': request})
        return Response(serializer.data)
    return Response({})

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TeamMemberSerializer
    
    def get_queryset(self):
        queryset = TeamMember.objects.filter(is_active=True)
        team_type = self.request.query_params.get('team_type', None)
        if team_type:
            queryset = queryset.filter(team_type=team_type)
        return queryset
    
    def get_serializer_context(self):
        return {'request': self.request}


class JourneyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Journey.objects.filter(is_active=True)
    serializer_class = JourneySerializer
    
    def get_serializer_context(self):
        return {'request': self.request}
