import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shubhayaan_ev.settings')
django.setup()

from api.models import WebsiteVisit
from datetime import datetime, timedelta
import random

# Create some sample website visits
ip_addresses = [
    '192.168.1.1',
    '10.0.0.1',
    '172.16.0.1',
    '203.0.113.1',
    '198.51.100.1',
]

pages = [
    '/',
    '/about',
    '/products',
    '/services',
    '/contact',
    '/gallery',
    '/test-drive',
]

print("Creating sample website visits...")

for i in range(50):
    WebsiteVisit.objects.create(
        ip_address=random.choice(ip_addresses),
        user_agent=f'Mozilla/5.0 (Sample Browser {i})',
        page_url=random.choice(pages)
    )

print(f"✅ Created 50 sample website visits!")
print(f"Total visits in database: {WebsiteVisit.objects.count()}")
