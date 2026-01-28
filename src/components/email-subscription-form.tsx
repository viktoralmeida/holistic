"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailSubscriptionFormProps {
  className?: string;
}

export function EmailSubscriptionForm({ className }: EmailSubscriptionFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    message: ''
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
        setFormData({ firstName: '', email: '', message: '' });
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
          Zapisz się do newslettera
        </CardTitle>
        <p className="text-muted-foreground">
          Otrzymuj najnowsze informacje o HEAD SPA, promocjach i szkoleniach
        </p>
      </CardHeader>
      
      <CardContent>
        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Dziękujemy za zapisanie się!
            </h3>
            <p className="text-muted-foreground mb-4">
              Sprawdź swoją skrzynkę email - wysłaliśmy Ci powitalną wiadomość.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                  Imię *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="bg-background border-[#b19681] focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="Twoje imię"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-background border-[#b19681] focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="twoj@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-foreground">
                Wiadomość (opcjonalnie)
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
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
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-md shadow-lg hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px] transition-all duration-300 border border-[#b19681]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Wysyłanie...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Zapisz się i wyślij wiadomość
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Wysyłając formularz, wyrażasz zgodę na otrzymywanie wiadomości od Holistic Point.
              Możesz zrezygnować w każdej chwili.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}


