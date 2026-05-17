from django.db import models

class WebsiteVisit(models.Model):
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    page_url = models.CharField(max_length=500, blank=True)
    visited_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Website Visits"
        ordering = ['-visited_at']
    
    def __str__(self):
        return f"Visit from {self.ip_address} at {self.visited_at}"

class HeroContent(models.Model):
    MEDIA_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]
    
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
    media_type = models.CharField(max_length=10, choices=MEDIA_CHOICES, default='image')
    media_file = models.FileField(upload_to='hero/')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0, help_text="Lower number shows first")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Hero Content"
        ordering = ['order', 'id']
    
    def __str__(self):
        return self.title

class SiteLogo(models.Model):
    logo = models.ImageField(upload_to='logo/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Site Logo"
    
    def __str__(self):
        return f"Logo - {self.created_at.strftime('%Y-%m-%d')}"

class AboutContent(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='about/')
    
    class Meta:
        verbose_name_plural = "About Content"
    
    def __str__(self):
        return self.title

class CompanyVision(models.Model):
    title = models.CharField(max_length=200, default="Our Vision")
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True, help_text="Icon name or emoji")
    image = models.ImageField(upload_to='company/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        verbose_name_plural = "Company Vision"
        ordering = ['order']
    
    def __str__(self):
        return self.title

class CompanyMission(models.Model):
    title = models.CharField(max_length=200, default="Our Mission")
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True, help_text="Icon name or emoji")
    image = models.ImageField(upload_to='company/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        verbose_name_plural = "Company Mission"
        ordering = ['order']
    
    def __str__(self):
        return self.title

class CompanyGoal(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True, help_text="Icon name or emoji (used as fallback if no image)")
    image = models.ImageField(upload_to='goals/', blank=True, null=True, help_text="Upload an image")
    media_url = models.URLField(blank=True, help_text="Or provide a Google Drive/external image URL")
    target_year = models.IntegerField(blank=True, null=True, help_text="Target year for this goal")
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        verbose_name_plural = "Company Goals"
        ordering = ['order']
    
    def __str__(self):
        return self.title
    
    def get_media_url(self):
        """Return image URL or external media URL"""
        if self.image:
            return self.image.url
        elif self.media_url:
            # Handle Google Drive links
            if 'drive.google.com' in self.media_url:
                # Convert Google Drive share link to direct link
                if '/file/d/' in self.media_url:
                    file_id = self.media_url.split('/file/d/')[1].split('/')[0]
                    return f'https://drive.google.com/uc?export=view&id={file_id}'
                elif 'id=' in self.media_url:
                    file_id = self.media_url.split('id=')[1].split('&')[0]
                    return f'https://drive.google.com/uc?export=view&id={file_id}'
            return self.media_url
        return None

class FuturePlan(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True, help_text="Icon name or emoji")
    timeline = models.CharField(max_length=100, blank=True, help_text="e.g., 2025-2027, Next 5 years")
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        verbose_name_plural = "Future Plans"
        ordering = ['order']
    
    def __str__(self):
        return self.title

class CompanyHistory(models.Model):
    year = models.IntegerField(help_text="Year of the milestone")
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='history/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0, help_text="Lower number shows first")
    
    class Meta:
        verbose_name_plural = "Company History"
        ordering = ['order', 'year']
    
    def __str__(self):
        return f"{self.year} - {self.title}"

class PageHero(models.Model):
    PAGE_CHOICES = [
        ('about', 'About Us'),
        ('services', 'Services'),
        ('products', 'Products'),
        ('contact', 'Contact Us'),
        ('gallery', 'Gallery'),
        ('test-drive', 'Test Drive'),
        ('journey', 'Journey'),
        ('history', 'History'),
    ]
    
    page = models.CharField(max_length=50, choices=PAGE_CHOICES, unique=True)
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True)
    image = models.ImageField(upload_to='page_heroes/')
    
    class Meta:
        verbose_name_plural = "Page Heroes"
    
    def __str__(self):
        return f"{self.get_page_display()} Hero"

class ContactEnquiry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False, help_text="Mark as read")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Contact Enquiries"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"

class Service(models.Model):
    ICON_CHOICES = [
        ('charging', 'Charging Station'),
        ('showroom', 'Showroom'),
        ('service', 'Service Center'),
        ('restaurant', 'Restaurant'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=20, choices=ICON_CHOICES)
    image = models.ImageField(upload_to='services/')
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title

class ServiceLocationDetail(models.Model):
    CHARGING_TYPE_CHOICES = [
        ('none', 'None'),
        ('fast', 'Fast Charging'),
        ('moderate', 'Moderate Charging'),
        ('slow', 'Slow Charging'),
    ]
    
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='locations')
    location_name = models.CharField(max_length=200)
    address = models.TextField()
    city = models.CharField(max_length=100, blank=True)
    district = models.CharField(max_length=100, blank=True)
    contact_person = models.CharField(max_length=200, blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    charging_type = models.CharField(max_length=20, choices=CHARGING_TYPE_CHOICES, default='none', help_text="Select charging type if available")
    washing_facility = models.BooleanField(default=False, help_text="Check if washing facility is available")
    image = models.ImageField(upload_to='service_locations/', blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Service Location Details"
    
    def __str__(self):
        return f"{self.location_name} - {self.service.title}"

class ChargingStation(models.Model):
    CHARGING_TYPE_CHOICES = [
        ('fast', 'Fast Charging'),
        ('moderate', 'Moderate Charging'),
        ('slow', 'Slow Charging'),
    ]
    
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    district = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='charging_stations/')
    charging_type = models.CharField(max_length=20, choices=CHARGING_TYPE_CHOICES, default='moderate')
    washing_facility = models.BooleanField(default=False, help_text="Check if washing facility is available")
    contact_person = models.CharField(max_length=200, blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    map_embed_code = models.TextField(blank=True, help_text="Paste Google Maps embed iframe code here")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Charging Stations"
    
    def __str__(self):
        return f"{self.name}, {self.district}"

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('kaweii', 'Kaweii'),
        ('nevko', 'Nevko'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    custom_category = models.CharField(max_length=100, blank=True, help_text="Enter custom category if 'Other' is selected")
    description = models.TextField()
    price = models.CharField(max_length=100)
    specifications = models.TextField()
    image = models.ImageField(upload_to='products/')
    
    # Feature specifications
    battery_capacity = models.CharField(max_length=100, blank=True)
    model = models.CharField(max_length=100, blank=True)
    range_per_charge = models.CharField(max_length=100, blank=True)
    charging_time = models.CharField(max_length=100, blank=True)
    top_speed = models.CharField(max_length=100, blank=True)
    seating_capacity = models.CharField(max_length=100, blank=True)
    
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name

class Offer(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='offers/')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name_plural = "Offers"
    
    def __str__(self):
        return self.title

class GalleryImage(models.Model):
    CATEGORY_CHOICES = [
        ('kaweii', 'Kaweii'),
        ('nevko', 'Nevko'),
        ('general', 'General'),
    ]
    
    MEDIA_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='general')
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES, default='image')
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    video = models.FileField(upload_to='gallery/videos/', blank=True, null=True, help_text="Upload video file (MP4, WebM, etc.)")
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name_plural = "Gallery Media"
    
    def __str__(self):
        return self.title
    
    def get_media_url(self):
        if self.media_type == 'video' and self.video:
            return self.video.url
        elif self.media_type == 'image' and self.image:
            return self.image.url
        return None

class TestDriveEnquiry(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20)
    preferred_date = models.DateField()
    preferred_time = models.TimeField()
    vehicle_interest = models.CharField(max_length=200)
    message = models.TextField(blank=True)
    is_read = models.BooleanField(default=False, help_text="Mark as read")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Test Drive Enquiries"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.vehicle_interest}"

class ChatbotFAQ(models.Model):
    question = models.CharField(max_length=500)
    answer = models.TextField()
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name_plural = "Chatbot FAQs"
    
    def __str__(self):
        return self.question

class ChatSession(models.Model):
    session_id = models.CharField(max_length=100, unique=True)
    user_name = models.CharField(max_length=200, blank=True)
    user_email = models.CharField(max_length=200, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-updated_at']
        verbose_name_plural = "Chat Sessions"
    
    def __str__(self):
        return f"Session {self.session_id} - {self.user_name or 'Anonymous'}"

class ChatMessage(models.Model):
    MESSAGE_TYPE_CHOICES = [
        ('user', 'User'),
        ('bot', 'Bot'),
        ('admin', 'Admin'),
    ]
    
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPE_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
        verbose_name_plural = "Chat Messages"
    
    def __str__(self):
        return f"{self.message_type}: {self.message[:50]}"

class CustomerReview(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    client_name = models.CharField(max_length=200)
    model_selected = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='reviews/', blank=True, null=True)
    review_description = models.TextField()
    rating = models.IntegerField(default=5, help_text="Rating out of 5")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Customer Reviews"
    
    def __str__(self):
        return f"{self.client_name} - {self.model_selected} ({self.status})"

class OwnerMessage(models.Model):
    owner_name = models.CharField(max_length=200)
    owner_title = models.CharField(max_length=200, help_text="e.g., Founder & CEO")
    message = models.TextField(help_text="Message from the owner")
    photo = models.ImageField(upload_to='owner/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Owner Messages"
    
    def __str__(self):
        return f"Message from {self.owner_name}"

class TeamMember(models.Model):
    TEAM_TYPE_CHOICES = [
        ('board', 'Board of Directors'),
        ('technical', 'Technical Team'),
    ]
    
    name = models.CharField(max_length=200)
    designation = models.CharField(max_length=200)
    team_type = models.CharField(max_length=20, choices=TEAM_TYPE_CHOICES)
    description = models.CharField(max_length=200, help_text="Short description (max 200 characters)")
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='team/')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['team_type', 'order']
        verbose_name_plural = "Team Members"
    
    def __str__(self):
        return f"{self.name} - {self.designation}"

class Journey(models.Model):
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=300, help_text="Brief description for card view")
    description = models.TextField(help_text="Full description (will be displayed in italic and justified)")
    cover_image = models.ImageField(upload_to='journey/')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name_plural = "Journey"
    
    def __str__(self):
        return self.title

class JourneyGallery(models.Model):
    journey = models.ForeignKey(Journey, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='journey/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Journey Gallery Images"
    
    def __str__(self):
        return f"{self.journey.title} - Image {self.order}"

