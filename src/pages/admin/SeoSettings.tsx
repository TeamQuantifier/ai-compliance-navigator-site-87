import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useSeoSettings, SeoSettings as SeoSettingsType } from '@/hooks/useSeoSettings';
import { toast } from 'sonner';
import { Save, Loader2, Globe, FileText, BarChart3, Settings } from 'lucide-react';

const SeoSettingsPage = () => {
  const { settings, isLoading, isSaving, saveSettings, reloadSettings } = useSeoSettings();
  const [formData, setFormData] = useState<SeoSettingsType>(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = <K extends keyof SeoSettingsType>(
    key: K,
    value: SeoSettingsType[K]
  ) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const success = await saveSettings(formData);
    if (success) {
      toast.success('Ustawienia SEO zapisane!');
    } else {
      toast.error('Błąd podczas zapisywania');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SEO Settings</h1>
          <p className="text-muted-foreground mt-1">
            Konfiguracja globalnych ustawień SEO dla strony
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Zapisz ustawienia
        </Button>
      </div>

      {/* Brand & Identity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Brand & Identity
          </CardTitle>
          <CardDescription>
            Podstawowe informacje o marce używane w SEO
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brandName">Nazwa marki</Label>
              <Input
                id="brandName"
                value={formData.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
                placeholder="Quantifier.ai"
              />
              <p className="text-xs text-muted-foreground">
                Używana w szablonach tytułów i schema.org
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brandUrl">URL strony</Label>
              <Input
                id="brandUrl"
                value={formData.brandUrl}
                onChange={(e) => handleChange('brandUrl', e.target.value)}
                placeholder="https://quantifier.ai"
              />
              <p className="text-xs text-muted-foreground">
                Pełny URL (z https://)
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultOgImage">Domyślny OG Image</Label>
            <Input
              id="defaultOgImage"
              value={formData.defaultOgImage}
              onChange={(e) => handleChange('defaultOgImage', e.target.value)}
              placeholder="/og-image.png"
            />
            <p className="text-xs text-muted-foreground">
              Obrazek używany gdy artykuł nie ma featured image
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Title & Meta Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Szablony Title & Meta
          </CardTitle>
          <CardDescription>
            Szablony dla automatycznego generowania tytułów i opisów
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="defaultTitleTemplate">Szablon tytułu</Label>
            <Input
              id="defaultTitleTemplate"
              value={formData.defaultTitleTemplate}
              onChange={(e) => handleChange('defaultTitleTemplate', e.target.value)}
              placeholder="{title} | {brand}"
            />
            <p className="text-xs text-muted-foreground">
              Dostępne zmienne: {'{title}'}, {'{brand}'}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultMetaTemplate">Szablon meta description</Label>
            <Input
              id="defaultMetaTemplate"
              value={formData.defaultMetaTemplate}
              onChange={(e) => handleChange('defaultMetaTemplate', e.target.value)}
              placeholder="{excerpt}"
            />
            <p className="text-xs text-muted-foreground">
              Dostępne zmienne: {'{excerpt}'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Content Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Progi treści
          </CardTitle>
          <CardDescription>
            Minimalne wymagania dla analizy SEO
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minWordsBlog">Min. słów (Blog Post)</Label>
              <Input
                id="minWordsBlog"
                type="number"
                min={100}
                max={2000}
                value={formData.minWordsBlog}
                onChange={(e) => handleChange('minWordsBlog', parseInt(e.target.value) || 600)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minWordsStory">Min. słów (Case Study)</Label>
              <Input
                id="minWordsStory"
                type="number"
                min={100}
                max={2000}
                value={formData.minWordsStory}
                onChange={(e) => handleChange('minWordsStory', parseInt(e.target.value) || 800)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>SEO Title (znaki)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={20}
                max={80}
                value={formData.titleMin}
                onChange={(e) => handleChange('titleMin', parseInt(e.target.value) || 45)}
                className="w-24"
              />
              <span className="text-muted-foreground">do</span>
              <Input
                type="number"
                min={40}
                max={100}
                value={formData.titleMax}
                onChange={(e) => handleChange('titleMax', parseInt(e.target.value) || 60)}
                className="w-24"
              />
              <span className="text-xs text-muted-foreground">znaków</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Meta Description (znaki)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={50}
                max={200}
                value={formData.descriptionMin}
                onChange={(e) => handleChange('descriptionMin', parseInt(e.target.value) || 120)}
                className="w-24"
              />
              <span className="text-muted-foreground">do</span>
              <Input
                type="number"
                min={100}
                max={300}
                value={formData.descriptionMax}
                onChange={(e) => handleChange('descriptionMax', parseInt(e.target.value) || 160)}
                className="w-24"
              />
              <span className="text-xs text-muted-foreground">znaków</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Default Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Ustawienia domyślne
          </CardTitle>
          <CardDescription>
            Domyślne wartości dla nowych artykułów
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Domyślny robots index</Label>
              <p className="text-xs text-muted-foreground">
                Czy nowe artykuły mają być domyślnie indeksowane
              </p>
            </div>
            <Switch
              checked={formData.defaultRobotsIndex}
              onCheckedChange={(checked) => handleChange('defaultRobotsIndex', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Domyślny robots follow</Label>
              <p className="text-xs text-muted-foreground">
                Czy roboty mają domyślnie śledzić linki
              </p>
            </div>
            <Switch
              checked={formData.defaultRobotsFollow}
              onCheckedChange={(checked) => handleChange('defaultRobotsFollow', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Breadcrumbs Schema</Label>
              <p className="text-xs text-muted-foreground">
                Domyślnie włącz BreadcrumbList w schema.org
              </p>
            </div>
            <Switch
              checked={formData.breadcrumbsEnabled}
              onCheckedChange={(checked) => handleChange('breadcrumbsEnabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>FAQ Schema</Label>
              <p className="text-xs text-muted-foreground">
                Automatycznie wykrywaj i dodawaj FAQPage schema
              </p>
            </div>
            <Switch
              checked={formData.faqSchemaEnabled}
              onCheckedChange={(checked) => handleChange('faqSchemaEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoSettingsPage;
