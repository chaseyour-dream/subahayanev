from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from .models import (
    Product, Service, ServiceLocationDetail, ChargingStation, 
    CustomerReview, ContactEnquiry, TestDriveEnquiry, TeamMember, 
    Journey, JourneyGallery, GalleryImage, Offer, ChatbotFAQ
)
from .serializers import (
    ProductSerializer, ServiceSerializer, ChargingStationSerializer,
    CustomerReviewSerializer, ContactEnquirySerializer, TestDriveEnquirySerializer,
    TeamMemberSerializer, JourneySerializer, GalleryImageSerializer
)
from datetime import datetime, timedelta


class ProductSerializerTest(TestCase):
    """Test Product serializer completeness"""
    
    def setUp(self):
        self.product = Product.objects.create(
            name="Kaweii Model X",
            category="kaweii",
            description="Electric vehicle",
          