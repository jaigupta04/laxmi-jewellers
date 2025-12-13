'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BaseCrudService } from '@/lib/mock-cms';
import { ProductGuides, FrequentlyAskedQuestions, EducationalContent } from '@/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image } from '@/components/ui/image-next';
import { BookOpen, HelpCircle, GraduationCap, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function ResourcesPage() {
  const [productGuides, setProductGuides] = useState<ProductGuides[]>([]);
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [educationalContent, setEducationalContent] = useState<EducationalContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guidesResponse, faqsResponse, contentResponse] = await Promise.all([
          BaseCrudService.getAll<ProductGuides>('productguides'),
          BaseCrudService.getAll<FrequentlyAskedQuestions>('frequentlyaskedquestions'),
          BaseCrudService.getAll<EducationalContent>('educationalcontent')
        ]);

        setProductGuides(guidesResponse.items);
        setFaqs(faqsResponse.items.filter(faq => faq.isPublished).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setEducationalContent(contentResponse.items);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, FrequentlyAskedQuestions[]>);

  const groupedGuides = productGuides.reduce((acc, guide) => {
    const category = guide.guideCategory || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(guide);
    return acc;
  }, {} as Record<string, ProductGuides[]>);

  const groupedContent = educationalContent.reduce((acc, content) => {
    const category = content.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(content);
    return acc;
  }, {} as Record<string, EducationalContent[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-buttonbackground border-t-transparent mx-auto mb-4"></div>
          <p className="font-paragraph text-foreground/80">Loading resources...</p>
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
              Resources
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Everything you need to know about jewelry, from buying guides to care instructions and industry insights
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <Tabs defaultValue="guides" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="guides" className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Product Guides</span>
              </TabsTrigger>
              <TabsTrigger value="faqs" className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />
                <span>FAQs</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>Educational Content</span>
              </TabsTrigger>
            </TabsList>

            {/* Product Guides Tab */}
            <TabsContent value="guides">
              <div className="mb-8">
                <h2 className="font-heading text-3xl text-foreground mb-4">Product Guides</h2>
                <p className="font-paragraph text-lg text-foreground/80">
                  Comprehensive guides to help you understand different types of jewelry, metals, and gemstones
                </p>
              </div>

              {Object.entries(groupedGuides).map(([category, guides]) => (
                <div key={category} className="mb-12">
                  <h3 className="font-heading text-2xl text-foreground mb-6">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((guide) => (
                      <Card key={guide._id} className="border-bordersubtle hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                          {guide.mainImage && (
                            <Image
                              src={guide.mainImage}
                              alt={guide.guideTitle || 'Product guide'}
                              width={400}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                          )}
                          <CardTitle className="font-heading text-xl text-foreground">
                            {guide.guideTitle}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-paragraph text-foreground/80 mb-4">
                            {guide.shortDescription}
                          </p>
                          {guide.publicationDate && (
                            <div className="flex items-center text-sm text-foreground/60 mb-4">
                              <Calendar className="w-4 h-4 mr-2" />
                              {format(new Date(guide.publicationDate), 'MMM dd, yyyy')}
                            </div>
                          )}
                          {guide.fullContent && (
                            <div className="font-paragraph text-sm text-foreground/80">
                              {guide.fullContent.substring(0, 150)}...
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs">
              <div className="mb-8">
                <h2 className="font-heading text-3xl text-foreground mb-4">Frequently Asked Questions</h2>
                <p className="font-paragraph text-lg text-foreground/80">
                  Find answers to common questions about our products, services, and policies
                </p>
              </div>

              {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                <div key={category} className="mb-12">
                  <h3 className="font-heading text-2xl text-foreground mb-6">{category}</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {categoryFaqs.map((faq, index) => (
                      <AccordionItem key={faq._id} value={`item-${faq._id}`} className="border-bordersubtle">
                        <AccordionTrigger className="font-paragraph text-left text-foreground hover:text-buttonbackground">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="font-paragraph text-foreground/80">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </TabsContent>

            {/* Educational Content Tab */}
            <TabsContent value="education">
              <div className="mb-8">
                <h2 className="font-heading text-3xl text-foreground mb-4">Educational Content</h2>
                <p className="font-paragraph text-lg text-foreground/80">
                  Learn about jewelry history, trends, care instructions, and industry insights
                </p>
              </div>

              {Object.entries(groupedContent).map(([category, articles]) => (
                <div key={category} className="mb-12">
                  <h3 className="font-heading text-2xl text-foreground mb-6">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((article) => (
                      <Card key={article._id} className="border-bordersubtle hover:shadow-lg transition-shadow">
                        <CardHeader>
                          {article.mainImage && (
                            <Image
                              src={article.mainImage}
                              alt={article.title || 'Educational content'}
                              width={500}
                              className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                          )}
                          <CardTitle className="font-heading text-xl text-foreground">
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-foreground/60 mb-4">
                            {article.author && (
                              <span>By {article.author}</span>
                            )}
                            {article.publishDate && (
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {format(new Date(article.publishDate), 'MMM dd, yyyy')}
                              </div>
                            )}
                          </div>
                          {article.content && (
                            <p className="font-paragraph text-foreground/80">
                              {article.content.substring(0, 200)}...
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-secondary-foreground mb-4">Quick Jewelry Tips</h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80">
              Essential tips for jewelry care and maintenance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-bordersubtle">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-softaccent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="font-heading text-lg text-secondary-foreground mb-2">Diamond Care</h4>
                <p className="font-paragraph text-sm text-secondary-foreground/80">
                  Clean with warm soapy water and a soft brush monthly
                </p>
              </CardContent>
            </Card>

            <Card className="border-bordersubtle">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-softaccent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🥇</span>
                </div>
                <h4 className="font-heading text-lg text-secondary-foreground mb-2">Gold Storage</h4>
                <p className="font-paragraph text-sm text-secondary-foreground/80">
                  Store in separate compartments to prevent scratching
                </p>
              </CardContent>
            </Card>

            <Card className="border-bordersubtle">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-softaccent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <h4 className="font-heading text-lg text-secondary-foreground mb-2">Regular Inspection</h4>
                <p className="font-paragraph text-sm text-secondary-foreground/80">
                  Check prongs and settings every 6 months
                </p>
              </CardContent>
            </Card>

            <Card className="border-bordersubtle">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-softaccent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h4 className="font-heading text-lg text-secondary-foreground mb-2">Professional Service</h4>
                <p className="font-paragraph text-sm text-secondary-foreground/80">
                  Annual professional cleaning and inspection
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact for More Info */}
      <section className="bg-primary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-primary-foreground mb-4">
            Need More Information?
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Our jewelry experts are here to help answer any questions you may have
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-8 py-3 bg-buttonbackground text-buttonforeground font-paragraph rounded-lg hover:bg-buttonbackground/90 transition-colors"
          >
            Contact Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
