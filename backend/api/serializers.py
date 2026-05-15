from rest_framework import serializers
from .models import (HeroContent, SiteLogo, AboutContent, Service, ServiceLocationDetail, Product, PageHero, 
                     ContactEnquiry, ChargingStation, Offer, GalleryImage, TestDriveEnquiry,
                     ChatbotFAQ, ChatSession, ChatMessage, CustomerReview, OwnerMessage, TeamMember, Journey, JourneyGallery,
                     CompanyVision, CompanyMission, CompanyGoal, FuturePlan, CompanyHistory)

class HeroContentSerializer(serializers.ModelSerializer):
    media_file = serializers.SerializerMethodField()
    
    class Meta:
        model = HeroContent
        fields = '__all__'
    
    def get_media_file(self, obj):
        request = self.context.get('request')
        if obj.media_file and hasattr(obj.media_file, 'url'):
            if request:
                return request.build_absolute_uri(obj.media_file.url)
            return obj.media_file.url
        return None

class AboutContentSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = AboutContent
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class ServiceLocationDetailSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceLocationDetail
        fields = ['id', 'location_name', 'address', 'city', 'district', 'contact_person', 'contact_phone', 'charging_type', 'washing_facility', 'image', 'order']
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class ServiceSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    locations = ServiceLocationDetailSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    display_category = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def get_display_category(self, obj):
        """Return custom category if 'other' is selected, otherwise return the choice display"""
        if obj.category == 'other' and obj.custom_category:
            return obj.custom_category
        return obj.get_category_display()


class PageHeroSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = PageHero
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = '__all__'
        read_only_fields = ['created_at']


class SiteLogoSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    
    class Meta:
        model = SiteLogo
        fields = '__all__'
    
    def get_logo(self, obj):
        request = self.context.get('request')
        if obj.logo and hasattr(obj.logo, 'url'):
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None

class ChargingStationSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = ChargingStation
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class OfferSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Offer
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class GalleryImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()
    media_url = serializers.SerializerMethodField()
    
    class Meta:
        model = GalleryImage
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def get_video(self, obj):
        request = self.context.get('request')
        if obj.video and hasattr(obj.video, 'url'):
            if request:
                return request.build_absolute_uri(obj.video.url)
            return obj.video.url
        return None
    
    def get_media_url(self, obj):
        request = self.context.get('request')
        media_url = obj.get_media_url()
        if media_url and request:
            return request.build_absolute_uri(media_url)
        return media_url

class TestDriveEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = TestDriveEnquiry
        fields = '__all__'
        read_only_fields = ['created_at']

class ChatbotFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatbotFAQ
        fields = ['id', 'question', 'answer', 'order']

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'message_type', 'message', 'created_at']
        read_only_fields = ['created_at']

class ChatSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = ChatSession
        fields = ['id', 'session_id', 'user_name', 'user_email', 'is_active', 'messages', 'created_at', 'updated_at']
        read_only_fields = ['session_id', 'created_at', 'updated_at']

class CustomerReviewSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomerReview
        fields = ['id', 'client_name', 'model_selected', 'photo', 'photo_url', 'review_description', 'rating', 'status', 'created_at', 'updated_at']
        read_only_fields = ['status', 'created_at', 'updated_at', 'photo_url']
    
    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo and hasattr(obj.photo, 'url'):
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None

class OwnerMessageSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    
    class Meta:
        model = OwnerMessage
        fields = '__all__'
    
    def get_photo(self, obj):
        request = self.context.get('request')
        if obj.photo and hasattr(obj.photo, 'url'):
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None

class TeamMemberSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    
    class Meta:
        model = TeamMember
        fields = '__all__'
    
    def get_photo(self, obj):
        request = self.context.get('request')
        if obj.photo and hasattr(obj.photo, 'url'):
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None
        return None


class JourneyGallerySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = JourneyGallery
        fields = ['id', 'image', 'caption', 'order']
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class JourneySerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    gallery_images = JourneyGallerySerializer(many=True, read_only=True)
    
    class Meta:
        model = Journey
        fields = ['id', 'title', 'short_description', 'description', 'cover_image', 'gallery_images', 'order', 'created_at']
    
    def get_cover_image(self, obj):
        request = self.context.get('request')
        if obj.cover_image and hasattr(obj.cover_image, 'url'):
            if request:
                return request.build_absolute_uri(obj.cover_image.url)
            return obj.cover_image.url
        return None

class CompanyVisionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = CompanyVision
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class CompanyMissionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = CompanyMission
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class CompanyGoalSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    media_display_url = serializers.SerializerMethodField()
    
    class Meta:
        model = CompanyGoal
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
    
    def get_media_display_url(self, obj):
        """Return the appropriate media URL for display"""
        request = self.context.get('request')
        media_url = obj.get_media_url()
        
        if media_url:
            # If it's a relative URL (uploaded image), make it absolute
            if media_url.startswith('/') and request:
                return request.build_absolute_uri(media_url)
            # Otherwise return as-is (external URL or Google Drive)
            return media_url
        return None

class FuturePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuturePlan
        fields = '__all__'

class CompanyHistorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = CompanyHistory
        fields = '__all__'
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
