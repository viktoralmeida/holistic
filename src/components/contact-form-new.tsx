"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Mail, Send, CheckCircle, AlertCircle, Loader2, Phone, User, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
// Simple date formatter without external dependencies - Polish locale and timezone
const formatDate = (date: Date) => {
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Warsaw'
  });
};

interface ContactFormNewProps {
  className?: string;
}

export function ContactFormNew({ className }: ContactFormNewProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    email: '',
    message: '',
    preferredDate: null as Date | null,
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ firstName: '', phone: '', email: '', message: '', preferredDate: null, preferredTime: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Wystąpił błąd podczas wysyłania');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Wystąpił błąd połączenia');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("bg-card/70 backdrop-blur-sm border border-[#b19681] shadow-xl", className)}>
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-md flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Skontaktuj się z nami
        </CardTitle>
        <p className="text-muted-foreground">
          Masz pytania? Chętnie pomożemy Ci w wyborze najlepszego rozwiązania.
        </p>
      </CardHeader>
      
      <CardContent>
        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Dziękujemy za wiadomość!
            </h3>
            <p className="text-muted-foreground mb-4">
              Otrzymaliśmy Twoją wiadomość i skontaktujemy się z Tobą w ciągu 24 godzin.
            </p>
            <Button 
              onClick={() => setSubmitStatus('idle')}
              variant="outline"
              className="border-[#b19681] hover:bg-primary/10"
            >
              Wyślij kolejną wiadomość
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                Imię *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="pl-10 bg-background border-[#b19681] focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="Twoje imię"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Telefon
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 bg-background border-[#b19681] focus:border-primary focus:ring-1 focus:ring-primary/20"
                    placeholder="+48 123 456 789"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10 bg-background border-[#b19681] focus:border-primary focus:ring-1 focus:ring-primary/20"
                    placeholder="twoj@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Chcesz wybrać datę?
                </Label>
                <div className="text-xs text-muted-foreground">
                  Opcjonalnie - wybierz preferowaną datę kontaktu
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Preferowana data
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-background border-[#b19681] hover:bg-muted/30 text-foreground",
                        !formData.preferredDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {formData.preferredDate ? (
                        <span className="text-foreground">{formatDate(formData.preferredDate)}</span>
                      ) : (
                        <span className="text-muted-foreground">Wybierz datę</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border border-[#b19681] shadow-xl" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.preferredDate || undefined}
                      onSelect={(date) => setFormData(prev => ({ ...prev, preferredDate: date || null }))}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || date.getDay() === 0 || date.getDay() === 6; // Disable weekends (0=Sunday, 6=Saturday)
                      }}
                      initialFocus
                      className="bg-background text-foreground"
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-medium text-foreground",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-foreground hover:bg-muted",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-foreground hover:bg-muted hover:text-foreground",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground",
                        day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                    />
                    
                    {/* Time Selection */}
                    <div className="p-4 border-t border-[#b19681] bg-background">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">
                          Wybierz godzinę
                        </Label>
                        <div className="text-xs text-muted-foreground mb-2">
                          9:00-20:00 (Poniedziałek - Piątek)
                        </div>
                        <Input
                          type="time"
                          value={formData.preferredTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                          className="bg-background border-[#b19681] focus:border-primary focus:ring-1 focus:ring-primary/20 text-foreground"
                          min="09:00"
                          max="20:00"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-foreground">
                Wiadomość *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="bg-background border-[#b19681] focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                placeholder="Napisz nam o swoich potrzebach lub pytaniach..."
              />
            </div>

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-6 rounded-md shadow-lg hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px] transition-all duration-300 border border-[#b19681] h-14"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Wysyłanie...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Wyślij wiadomość
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Wysyłając formularz, wyrażasz zgodę na przetwarzanie danych osobowych w celu odpowiedzi na Twoje zapytanie.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
