import HeroSection from '@/components/HeroSection'
import OffersSection from '@/components/OffersSection'
import ServicesSection from '@/components/ServicesSection'
import AccordionGallery from '@/components/AccordionGallery'
import ProductsSection from '@/components/ProductsSection'
import ChargingStationsSection from '@/components/ChargingStationsSection'
import TestDriveSection from '@/components/TestDriveSection'
import CustomerReviews from '@/components/CustomerReviews'
import Chatbot from '@/components/Chatbot'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ================= STICKY SOCIAL SIDEBAR ================= */
        .social-sidebar {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 15px;
          background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
          padding: 20px 12px;
          border-radius: 50px 0 0 50px;
          box-shadow: -4px 0 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        .social-sidebar-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          color: white;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          font-size: 20px;
        }
        .social-sidebar-link:hover {
          transform: scale(1.1);
        }
        .social-sidebar-link.facebook {
          background: #1877F2;
        }
        .social-sidebar-link.facebook:hover {
          background: #0d65d9;
          box-shadow: 0 0 15px rgba(24, 119, 242, 0.6);
        }
        .social-sidebar-link.instagram {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }
        .social-sidebar-link.instagram:hover {
          background: linear-gradient(45deg, #d87e2a 0%, #d4572e 25%, #c91f38 50%, #b81e59 75%, #a8157a 100%);
          box-shadow: 0 0 15px rgba(220, 39, 67, 0.6);
        }
        .social-sidebar-link.whatsapp {
          background: #25D366;
        }
        .social-sidebar-link.whatsapp:hover {
          background: #1fb855;
          box-shadow: 0 0 15px rgba(37, 211, 102, 0.6);
        }
        .social-sidebar-link.youtube {
          background: #FF0000;
        }
        .social-sidebar-link.youtube:hover {
          background: #cc0000;
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
        }
        @media (max-width: 768px) {
          .social-sidebar {
            padding: 12px 8px;
            gap: 10px;
            border-radius: 30px 0 0 30px;
          }
          .social-sidebar-link {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }
        }
        @media (max-width: 480px) {
          .social-sidebar {
            padding: 10px 6px;
            gap: 8px;
            border-radius: 25px 0 0 25px;
          }
          .social-sidebar-link {
            width: 32px;
            height: 32px;
            font-size: 13px;
          }
        }
      `}} />
      
      {/* Sticky Social Media Sidebar */}
      <div className="social-sidebar">
        <a 
          href="https://www.facebook.com/profile.php?id=61588018444938" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-sidebar-link facebook" 
          title="Facebook"
        >
          <FaFacebookF />
        </a>
        <a 
          href="https://www.instagram.com/shubhayaan/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-sidebar-link instagram" 
          title="Instagram"
        >
          <FaInstagram />
        </a>
        <a 
          href="https://wa.me/9802302556" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-sidebar-link whatsapp" 
          title="WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>

      <HeroSection />
      <ServicesSection />
      <OffersSection />
      <div className="py-2 bg-white"></div>
      <ChargingStationsSection />
      <ProductsSection />
      <AccordionGallery />
      <CustomerReviews />
      <TestDriveSection />
      <Chatbot />
    </>
  )
}
