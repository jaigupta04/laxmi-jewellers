import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export default function CartContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary flex items-center justify-center py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-[100rem] w-full px-6 relative z-10">
        <div className="text-center">
          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8"
          >
            <ShoppingCart className="w-5 h-5 text-primary" />
            <span className="font-paragraph text-primary font-semibold">Coming Soon</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight"
          >
            Cart Feature Coming Soon
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-8"
          >
            We're preparing an amazing shopping experience for you. Our cart feature will be available very soon!
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto mb-12"
          >
            In the meantime, explore our custom design services or browse our resources to learn more about our exquisite jewelry collection.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/customization" className="flex items-center gap-2">
                Explore Custom Design
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="bg-white/50 backdrop-blur-sm border border-primary/10 rounded-lg p-8">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="font-heading text-xl text-foreground mb-2">Easy Checkout</h3>
              <p className="font-paragraph text-foreground/70">
                Seamless cart management and secure checkout process
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm border border-primary/10 rounded-lg p-8">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-heading text-xl text-foreground mb-2">Fast Delivery</h3>
              <p className="font-paragraph text-foreground/70">
                Quick and reliable shipping with tracking information
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm border border-primary/10 rounded-lg p-8">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="font-heading text-xl text-foreground mb-2">Secure Payment</h3>
              <p className="font-paragraph text-foreground/70">
                Multiple payment options with complete security
              </p>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 p-8 bg-primary/5 backdrop-blur-sm border border-primary/20 rounded-lg max-w-2xl mx-auto"
          >
            <h3 className="font-heading text-2xl text-foreground mb-4">What's Coming</h3>
            <ul className="font-paragraph text-foreground/80 space-y-3 text-left">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Browse and add items to your cart</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Apply coupon codes and discounts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Review order summary before checkout</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Multiple secure payment methods</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
