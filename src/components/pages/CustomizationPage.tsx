'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image-next';
import { Palette, Gem, Settings, MessageCircle, CheckCircle } from 'lucide-react';

export default function CustomizationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: '',
    metalType: '',
    occasion: '',
    budget: '',
    description: '',
    inspiration: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Customization request:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="font-heading text-3xl text-foreground mb-4">Request Submitted!</h1>
          <p className="font-paragraph text-foreground/80 mb-6">
            Thank you for your customization request. Our design team will review your requirements 
            and contact you within 24 hours to discuss your project.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="bg-buttonbackground text-buttonforeground">
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center">
            <h1 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-6">
              Custom Design
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Bring your vision to life with our personalized jewelry design service. 
              Create something uniquely yours with our master craftsmen.
            </p>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="bg-background py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-foreground mb-4">Our Design Process</h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
              From concept to creation, we guide you through every step of bringing your dream jewelry to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">1. Consultation</h3>
              <p className="font-paragraph text-foreground/80">
                Share your vision, preferences, and requirements with our design experts
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Palette className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">2. Design</h3>
              <p className="font-paragraph text-foreground/80">
                Our designers create detailed sketches and 3D renderings of your piece
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Settings className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">3. Crafting</h3>
              <p className="font-paragraph text-foreground/80">
                Master craftsmen bring your design to life using traditional techniques
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Gem className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">4. Delivery</h3>
              <p className="font-paragraph text-foreground/80">
                Your unique piece is carefully finished, certified, and delivered to you
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Customization Form */}
      <section className="bg-secondary py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-heading text-4xl text-secondary-foreground mb-6">Start Your Custom Design</h2>
              <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8">
                Fill out the form below to begin your custom jewelry journey. Our design team will contact you 
                within 24 hours to discuss your project in detail.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-paragraph text-secondary-foreground mb-2">Name *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="bg-background border-bordersubtle"
                    />
                  </div>
                  <div>
                    <label className="block font-paragraph text-secondary-foreground mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-background border-bordersubtle"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-paragraph text-secondary-foreground mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-background border-bordersubtle"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-paragraph text-secondary-foreground mb-2">Product Type *</label>
                    <Select value={formData.productType} onValueChange={(value) => handleInputChange('productType', value)}>
                      <SelectTrigger className="bg-background border-bordersubtle">
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ring">Ring</SelectItem>
                        <SelectItem value="necklace">Necklace</SelectItem>
                        <SelectItem value="earrings">Earrings</SelectItem>
                        <SelectItem value="bracelet">Bracelet</SelectItem>
                        <SelectItem value="pendant">Pendant</SelectItem>
                        <SelectItem value="chain">Chain</SelectItem>
                        <SelectItem value="mangalsutra">Mangalsutra</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block font-paragraph text-secondary-foreground mb-2">Metal Type</label>
                    <Select value={formData.metalType} onValueChange={(value) => handleInputChange('metalType', value)}>
                      <SelectTrigger className="bg-background border-bordersubtle">
                        <SelectValue placeholder="Select metal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yellow-gold">Yellow Gold</SelectItem>
                        <SelectItem value="rose-gold">Rose Gold</SelectItem>
                        <SelectItem value="platinum">Platinum</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-paragraph text-secondary-foreground mb-2">Occasion</label>
                    <Select value={formData.occasion} onValueChange={(value) => handleInputChange('occasion', value)}>
                      <SelectTrigger className="bg-background border-bordersubtle">
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="daily-wear">Daily Wear</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="party">Party</SelectItem>
                        <SelectItem value="gift">Gift</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block font-paragraph text-secondary-foreground mb-2">Budget Range</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="bg-background border-bordersubtle">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-25k">Under ₹25,000</SelectItem>
                        <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                        <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                        <SelectItem value="100k-250k">₹1,00,000 - ₹2,50,000</SelectItem>
                        <SelectItem value="250k-500k">₹2,50,000 - ₹5,00,000</SelectItem>
                        <SelectItem value="above-500k">Above ₹5,00,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block font-paragraph text-secondary-foreground mb-2">Design Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your vision in detail. Include any specific requirements, preferences, or special features you'd like..."
                    required
                    className="bg-background border-bordersubtle min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="block font-paragraph text-secondary-foreground mb-2">Inspiration or Reference</label>
                  <Textarea
                    value={formData.inspiration}
                    onChange={(e) => handleInputChange('inspiration', e.target.value)}
                    placeholder="Share any inspiration sources, reference images, or existing pieces that inspire your design..."
                    className="bg-background border-bordersubtle"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-buttonbackground text-buttonforeground hover:bg-buttonbackground/90">
                  Submit Customization Request
                </Button>
              </form>
            </div>
            {/* Gallery */}

          </div>
        </div>
      </section>
      {/* Why Choose Custom */}
      <section className="bg-background py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-foreground mb-4">Why Choose Custom Design?</h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
              Create jewelry that's as unique as you are with our personalized design service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Gem className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">Unique Design</h3>
              <p className="font-paragraph text-foreground/80">
                Create a one-of-a-kind piece that reflects your personal style and story
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Settings className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">Perfect Fit</h3>
              <p className="font-paragraph text-foreground/80">
                Customized to your exact specifications, preferences, and requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Palette className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">Expert Guidance</h3>
              <p className="font-paragraph text-foreground/80">
                Work directly with our master designers and craftsmen throughout the process
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
