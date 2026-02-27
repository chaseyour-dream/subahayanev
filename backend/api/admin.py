from django.contrib import admin
from django import forms
from django.utils.html import format_html
from .models import (HeroContent, SiteLogo, AboutContent, Service, ServiceLocationDetail, Product, PageHero, 
                     ContactEnquiry, ChargingStation, Offer, GalleryImage, TestDriveEnquiry,
                     ChatbotFAQ, ChatSession, ChatMessage, CustomerReview, OwnerMessage, TeamMember, Journey, JourneyGallery)

@admin.register(HeroContent)
class HeroContentAdmin(admin.ModelAdmin):
    list_display = ['title', 'media_type', 'is_active', 'created_at']
    list_filter = ['media_type', 'is_active']
    search_fields = ['title', 'subtitle']

@admin.register(SiteLogo)
class SiteLogoAdmin(admin.ModelAdmin):
    list_display = ['id', 'is_active', 'created_at']
    list_filter = ['is_active']

@admin.register(AboutContent)
class AboutContentAdmin(admin.ModelAdmin):
    list_display = ['title']
    search_fields = ['title', 'description']

class ServiceLocationDetailInline(admin.TabularInline):
    model = ServiceLocationDetail
    extra = 1
    fields = ['location_name', 'address', 'city', 'district', 'contact_person', 'contact_phone', 'charging_type', 'washing_facility', 'image', 'order']

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    list_filter = ['icon']
    search_fields = ['title', 'description']
    ordering = ['order']
    inlines = [ServiceLocationDetailInline]

@admin.register(ChargingStation)
class ChargingStationAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'district', 'charging_type', 'washing_facility', 'order']
    list_filter = ['district', 'charging_type', 'washing_facility']
    search_fields = ['name', 'location', 'description']
    ordering = ['order']
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'location', 'district', 'description', 'image', 'order')
        }),
        ('Facilities', {
            'fields': ('charging_type', 'washing_facility')
        }),
        ('Contact Details', {
            'fields': ('contact_person', 'contact_phone')
        }),
        ('Google Maps Integration', {
            'fields': ('map_embed_code',),
            'description': 'Paste the Google Maps embed iframe code here. To get it: Go to Google Maps → Search location → Share → Embed a map → Copy HTML'
        }),
    )

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'is_featured', 'created_at']
    list_filter = ['category', 'is_featured']
    search_fields = ['name', 'description']
    ordering = ['-created_at']

@admin.register(PageHero)
class PageHeroAdmin(admin.ModelAdmin):
    list_display = ['page', 'title']
    list_filter = ['page']
    search_fields = ['title', 'subtitle']

@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'subject', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']

@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'order', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title', 'description']
    ordering = ['order', '-created_at']

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'media_type', 'order', 'created_at']
    list_filter = ['category', 'media_type']
    search_fields = ['title', 'description']
    ordering = ['order', '-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'category', 'media_type', 'order')
        }),
        ('Media Files', {
            'fields': ('image', 'video'),
            'description': 'Upload either an image OR a video based on the media type selected above.'
        }),
    )
    
    def save_model(self, request, obj, form, change):
        # Clear the unused field based on media_type
        if obj.media_type == 'image':
            obj.video = None
        elif obj.media_type == 'video':
            obj.image = None
        super().save_model(request, obj, form, change)

@admin.register(TestDriveEnquiry)
class TestDriveEnquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'vehicle_interest', 'preferred_date', 'created_at']
    list_filter = ['preferred_date', 'created_at']
    search_fields = ['name', 'email', 'vehicle_interest']
    readonly_fields = ['created_at']
    ordering = ['-created_at']

@admin.register(ChatbotFAQ)
class ChatbotFAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['question', 'answer']
    ordering = ['order', '-created_at']

class ChatSessionAdminForm(forms.ModelForm):
    admin_reply = forms.CharField(
        widget=forms.Textarea(attrs={
            'rows': 3, 
            'cols': 80,
            'placeholder': 'Type your reply here and click Save to send...',
            'style': 'width: 100%; padding: 10px; border: 2px solid #3b82f6; border-radius: 5px;'
        }),
        required=False,
        label='Send Reply',
        help_text='Type your message here and click Save. The user will receive it within 3 seconds.'
    )
    
    class Meta:
        model = ChatSession
        fields = '__all__'

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    form = ChatSessionAdminForm
    list_display = ['session_id', 'user_name', 'user_email', 'is_active', 'message_count', 'created_at', 'updated_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['session_id', 'user_name', 'user_email']
    readonly_fields = ['session_id', 'created_at', 'updated_at', 'display_messages']
    ordering = ['-updated_at']
    fieldsets = (
        ('Session Information', {
            'fields': ('session_id', 'user_name', 'user_email', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
        ('Conversation', {
            'fields': ('display_messages',),
            'classes': ('wide',),
        }),
        ('Reply to User', {
            'fields': ('admin_reply',),
            'classes': ('wide',),
            'description': '💬 Type your reply below and click "Save" to send it to the user.'
        }),
    )
    
    def message_count(self, obj):
        return obj.messages.count()
    message_count.short_description = 'Messages'
    
    def display_messages(self, obj):
        from django.utils.html import format_html
        messages = obj.messages.all().order_by('created_at')
        html = '<div style="max-height: 500px; overflow-y: auto; padding: 15px; background: #f5f5f5; border-radius: 8px; border: 2px solid #e5e7eb;">'
        
        if not messages:
            html += '<p style="color: #666; text-align: center; padding: 20px;">No messages yet. Waiting for user to start conversation...</p>'
        
        for msg in messages:
            if msg.message_type == 'user':
                color = '#10b981'
                bg = '#f0fdf4'
                icon = '👤'
                label = f'User: {obj.user_name or "Anonymous"}'
            elif msg.message_type == 'admin':
                color = '#3b82f6'
                bg = '#eff6ff'
                icon = '👨‍💼'
                label = 'Admin (You)'
            else:
                color = '#9ca3af'
                bg = '#f9fafb'
                icon = '🤖'
                label = 'Bot'
                
            html += f'''
            <div style="margin-bottom: 12px; padding: 12px; background: {bg}; border-left: 4px solid {color}; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <strong style="color: {color}; font-size: 12px;">{icon} {label}</strong>
                    <small style="color: #666;">{msg.created_at.strftime("%b %d, %Y %H:%M:%S")}</small>
                </div>
                <p style="margin: 0; color: #1f2937; white-space: pre-wrap; line-height: 1.5;">{msg.message}</p>
            </div>
            '''
        html += '</div>'
        return format_html(html)
    display_messages.short_description = '💬 Chat History'
    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        
        # Check if admin_reply field has content
        admin_reply = form.cleaned_data.get('admin_reply', '').strip()
        if admin_reply:
            # Create a new chat message with admin reply
            ChatMessage.objects.create(
                session=obj,
                message_type='admin',
                message=admin_reply
            )
            # Show success message
            from django.contrib import messages
            messages.success(request, f'✅ Your reply has been sent to {obj.user_name or "the user"}!')
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # Clear the admin_reply field after page load
        if obj and 'admin_reply' in form.base_fields:
            form.base_fields['admin_reply'].initial = ''
        return form

# ChatMessage is not registered in admin - managed through ChatSession only

@admin.register(CustomerReview)
class CustomerReviewAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'model_selected', 'rating', 'status', 'created_at', 'has_photo']
    list_filter = ['status', 'rating', 'created_at']
    search_fields = ['client_name', 'model_selected', 'review_description']
    readonly_fields = ['created_at', 'updated_at', 'photo_preview']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Customer Information', {
            'fields': ('client_name', 'model_selected')
        }),
        ('Review Details', {
            'fields': ('review_description', 'rating', 'status')
        }),
        ('Photo', {
            'fields': ('photo_preview', 'photo'),
            'description': 'Current photo is displayed above. Upload a new photo to replace it.'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    actions = ['approve_reviews', 'reject_reviews']
    
    def has_photo(self, obj):
        return bool(obj.photo)
    has_photo.boolean = True
    has_photo.short_description = 'Photo Uploaded'
    
    def photo_preview(self, obj):
        if obj.photo:
            return format_html(
                '<div style="margin: 10px 0;">'
                '<img src="{}" style="max-width: 300px; max-height: 300px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />'
                '<p style="margin-top: 10px; color: #666;"><strong>Current Photo:</strong> {}</p>'
                '</div>',
                obj.photo.url,
                obj.photo.name.split('/')[-1]
            )
        return format_html('<p style="color: #999;">No photo uploaded yet</p>')
    photo_preview.short_description = 'Current Photo'
    
    def approve_reviews(self, request, queryset):
        updated = queryset.update(status='approved')
        self.message_user(request, f'{updated} review(s) approved successfully.')
    approve_reviews.short_description = 'Approve selected reviews'
    
    def reject_reviews(self, request, queryset):
        updated = queryset.update(status='rejected')
        self.message_user(request, f'{updated} review(s) rejected.')
    reject_reviews.short_description = 'Reject selected reviews'

@admin.register(OwnerMessage)
class OwnerMessageAdmin(admin.ModelAdmin):
    list_display = ['owner_name', 'owner_title', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['owner_name', 'message']
    readonly_fields = ['created_at']

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'designation', 'team_type', 'email', 'phone', 'order', 'is_active']
    list_filter = ['team_type', 'is_active']
    search_fields = ['name', 'designation', 'email']
    ordering = ['team_type', 'order']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'designation', 'photo', 'description')
        }),
        ('Team Details', {
            'fields': ('team_type', 'order', 'is_active')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone')
        }),
    )


class JourneyGalleryInline(admin.TabularInline):
    model = JourneyGallery
    extra = 1
    fields = ['image', 'caption', 'order']

@admin.register(Journey)
class JourneyAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'short_description', 'description']
    ordering = ['order', '-created_at']
    inlines = [JourneyGalleryInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'short_description', 'cover_image', 'order', 'is_active')
        }),
        ('Detailed Description', {
            'fields': ('description',),
            'description': 'This will be displayed in italic and justified text on the detail page.'
        }),
    )
