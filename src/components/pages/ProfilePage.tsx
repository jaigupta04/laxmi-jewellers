import { useMember } from '@/integrations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { User, Mail, Phone, Calendar, Settings, ShoppingBag } from 'lucide-react';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { member } = useMember();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[100rem] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl text-foreground mb-4">My Profile</h1>
          <p className="font-paragraph text-lg text-foreground/80">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="border-bordersubtle">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  {member?.profile?.photo?.url ? (
                    <Image
                      src={member.profile.photo.url}
                      alt="Profile photo"
                      width={96}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-softaccent rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-buttonbackground" />
                    </div>
                  )}
                </div>
                <CardTitle className="font-heading text-2xl text-foreground">
                  {member?.profile?.nickname || member?.contact?.firstName || 'Welcome'}
                </CardTitle>
                <p className="font-paragraph text-foreground/80">
                  {member?.loginEmail}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-paragraph text-foreground/60">Member Since</span>
                  <span className="font-paragraph text-foreground">
                    {member?._createdDate ? format(new Date(member._createdDate), 'MMM yyyy') : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-paragraph text-foreground/60">Last Login</span>
                  <span className="font-paragraph text-foreground">
                    {member?.lastLoginDate ? format(new Date(member.lastLoginDate), 'MMM dd, yyyy') : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-paragraph text-foreground/60">Status</span>
                  <span className="font-paragraph text-green-600">
                    {member?.status || 'Active'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Personal Information */}
              <Card className="border-bordersubtle">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-foreground flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-paragraph text-foreground mb-2">First Name</label>
                      <Input
                        value={member?.contact?.firstName || ''}
                        readOnly
                        className="bg-secondary border-bordersubtle"
                      />
                    </div>
                    <div>
                      <label className="block font-paragraph text-foreground mb-2">Last Name</label>
                      <Input
                        value={member?.contact?.lastName || ''}
                        readOnly
                        className="bg-secondary border-bordersubtle"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-paragraph text-foreground mb-2">Nickname</label>
                    <Input
                      value={member?.profile?.nickname || ''}
                      readOnly
                      className="bg-secondary border-bordersubtle"
                    />
                  </div>
                  <div>
                    <label className="block font-paragraph text-foreground mb-2">Title</label>
                    <Input
                      value={member?.profile?.title || ''}
                      readOnly
                      className="bg-secondary border-bordersubtle"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-bordersubtle">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-foreground flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block font-paragraph text-foreground mb-2">Email Address</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={member?.loginEmail || ''}
                        readOnly
                        className="bg-secondary border-bordersubtle flex-1"
                      />
                      {member?.loginEmailVerified && (
                        <span className="text-green-600 text-sm font-paragraph">Verified</span>
                      )}
                    </div>
                  </div>
                  {member?.contact?.phones && member.contact.phones.length > 0 && (
                    <div>
                      <label className="block font-paragraph text-foreground mb-2">Phone Numbers</label>
                      {member.contact.phones.map((phone, index) => (
                        <Input
                          key={index}
                          value={phone}
                          readOnly
                          className="bg-secondary border-bordersubtle mb-2"
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="border-bordersubtle">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-foreground flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <h4 className="font-paragraph font-medium text-secondary-foreground">Email Notifications</h4>
                      <p className="font-paragraph text-sm text-secondary-foreground/80">
                        Receive updates about orders, offers, and new collections
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <h4 className="font-paragraph font-medium text-secondary-foreground">Privacy Settings</h4>
                      <p className="font-paragraph text-sm text-secondary-foreground/80">
                        Control how your information is used and shared
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <h4 className="font-paragraph font-medium text-secondary-foreground">Password</h4>
                      <p className="font-paragraph text-sm text-secondary-foreground/80">
                        Update your account password
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-bordersubtle">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-foreground flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="font-paragraph font-medium">View Order History</div>
                        <div className="font-paragraph text-sm text-foreground/60">Track your purchases</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="font-paragraph font-medium">Wishlist</div>
                        <div className="font-paragraph text-sm text-foreground/60">Saved items</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="font-paragraph font-medium">Custom Designs</div>
                        <div className="font-paragraph text-sm text-foreground/60">Your design requests</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="font-paragraph font-medium">Support</div>
                        <div className="font-paragraph text-sm text-foreground/60">Get help</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}