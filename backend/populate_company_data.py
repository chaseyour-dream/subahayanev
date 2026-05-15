import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shubhayaan_ev.settings')
django.setup()

from api.models import CompanyVision, CompanyMission, CompanyGoal, FuturePlan, CompanyHistory, PageHero

# Clear existing data
CompanyVision.objects.all().delete()
CompanyMission.objects.all().delete()
CompanyGoal.objects.all().delete()
FuturePlan.objects.all().delete()
CompanyHistory.objects.all().delete()

# Create Vision
CompanyVision.objects.create(
    title="Our Vision",
    description="""• Become Nepal's leading electric vehicle company
• Revolutionize sustainable transportation across the nation
• Make electric mobility accessible to all citizens
• Reduce carbon emissions and environmental impact
• Create a cleaner, greener future for generations to come
• Lead the transition to renewable energy in transportation""",
    icon="🔭",
    is_active=True,
    order=1
)

# Create Mission
CompanyMission.objects.create(
    title="Our Mission",
    description="""• Provide high-quality, affordable electric vehicles to all Nepali citizens
• Build comprehensive charging infrastructure across Nepal
• Deliver exceptional customer service and support
• Introduce innovative technology and sustainable solutions
• Empower individuals and businesses to embrace eco-friendly transportation
• Partner with communities to promote environmental awareness
• Ensure reliable and efficient EV ownership experience""",
    icon="🎯",
    is_active=True,
    order=1
)

# Create Goals
goals_data = [
    {
        "title": "Expand Charging Network",
        "description": "Establish 100+ charging stations across all major cities and highways in Nepal by 2027, ensuring convenient access to charging infrastructure for all EV owners.",
        "icon": "⚡",
        "target_year": 2027,
        "order": 1
    },
    {
        "title": "Market Leadership",
        "description": "Achieve 30% market share in Nepal's electric vehicle segment, becoming the most trusted and preferred EV brand in the country.",
        "icon": "🏆",
        "target_year": 2026,
        "order": 2
    },
    {
        "title": "Customer Satisfaction",
        "description": "Maintain 95%+ customer satisfaction rate through exceptional service, quality products, and continuous innovation in the EV space.",
        "icon": "⭐",
        "target_year": 2025,
        "order": 3
    },
    {
        "title": "Sustainable Operations",
        "description": "Achieve carbon-neutral operations by implementing renewable energy sources in all our facilities and promoting green practices throughout our supply chain.",
        "icon": "🌱",
        "target_year": 2028,
        "order": 4
    }
]

for goal in goals_data:
    CompanyGoal.objects.create(**goal, is_active=True)

# Create Future Plans
plans_data = [
    {
        "title": "Advanced Battery Technology",
        "description": "Invest in research and development of next-generation battery technology with longer range, faster charging, and improved durability. Partner with leading technology companies to bring cutting-edge innovations to Nepal.",
        "icon": "🔋",
        "timeline": "2025-2027",
        "order": 1
    },
    {
        "title": "Smart Mobility Solutions",
        "description": "Develop integrated mobile applications for vehicle monitoring, charging station locator, maintenance scheduling, and community features. Implement IoT technology for predictive maintenance and enhanced user experience.",
        "icon": "📱",
        "timeline": "2025-2026",
        "order": 2
    },
    {
        "title": "Fleet Electrification",
        "description": "Launch specialized EV solutions for commercial fleets, delivery services, and public transportation. Provide comprehensive fleet management systems and customized financing options for businesses.",
        "icon": "🚚",
        "timeline": "2026-2028",
        "order": 3
    },
    {
        "title": "Regional Expansion",
        "description": "Expand operations to neighboring countries in South Asia, establishing Shubhayaan as a regional leader in electric mobility. Create partnerships with international EV manufacturers and technology providers.",
        "icon": "🌏",
        "timeline": "2027-2030",
        "order": 4
    },
    {
        "title": "Renewable Energy Integration",
        "description": "Install solar panels at all charging stations and service centers, creating a fully sustainable charging ecosystem. Offer home solar + EV packages to customers for complete energy independence.",
        "icon": "☀️",
        "timeline": "2025-2028",
        "order": 5
    }
]

for plan in plans_data:
    FuturePlan.objects.create(**plan, is_active=True)

# Create Company History
history_data = [
    {
        "year": 2020,
        "title": "The Beginning",
        "description": "Shubhayaan Motors was founded with a vision to bring sustainable transportation to Nepal. Our journey began with extensive market research and partnerships with leading EV manufacturers.",
        "order": 1
    },
    {
        "year": 2021,
        "title": "First Showroom Launch",
        "description": "Opened our flagship showroom in Kathmandu, showcasing our first electric vehicle models. Received overwhelming response from environmentally conscious customers and early adopters.",
        "order": 2
    },
    {
        "year": 2022,
        "title": "Charging Infrastructure",
        "description": "Launched our first 10 charging stations across Kathmandu valley, making EV ownership more practical and convenient. Introduced fast-charging technology to reduce charging time significantly.",
        "order": 3
    },
    {
        "year": 2023,
        "title": "Expansion & Growth",
        "description": "Expanded operations to major cities including Pokhara, Chitwan, and Butwal. Sold over 500 electric vehicles and established 25+ charging stations nationwide. Launched our service center network.",
        "order": 4
    },
    {
        "year": 2024,
        "title": "Innovation & Recognition",
        "description": "Introduced advanced EV models with improved range and features. Received 'Best EV Company in Nepal' award. Partnered with government initiatives to promote electric mobility and reduce carbon emissions.",
        "order": 5
    },
    {
        "year": 2025,
        "title": "Market Leadership",
        "description": "Achieved significant market share in Nepal's EV segment. Launched mobile app for seamless customer experience. Expanded charging network to 50+ stations covering major highways and tourist destinations.",
        "order": 6
    },
    {
        "year": 2026,
        "title": "Future Forward",
        "description": "Continuing our mission to revolutionize transportation in Nepal. Planning regional expansion and introducing next-generation electric vehicles with cutting-edge technology and sustainable practices.",
        "order": 7
    }
]

for history in history_data:
    CompanyHistory.objects.create(**history, is_active=True)

# Create History page hero if it doesn't exist
PageHero.objects.get_or_create(
    page='history',
    defaults={
        'title': 'Our Journey',
        'subtitle': 'Discover the milestones that shaped Shubhayaan Motors into Nepal\'s leading electric vehicle company',
        'image': 'page_heroes/aa.png'  # You can change this to an appropriate image
    }
)

print("✅ Company data populated successfully!")
print(f"- {CompanyVision.objects.count()} Vision entries")
print(f"- {CompanyMission.objects.count()} Mission entries")
print(f"- {CompanyGoal.objects.count()} Goals")
print(f"- {FuturePlan.objects.count()} Future Plans")
print(f"- {CompanyHistory.objects.count()} History milestones")
