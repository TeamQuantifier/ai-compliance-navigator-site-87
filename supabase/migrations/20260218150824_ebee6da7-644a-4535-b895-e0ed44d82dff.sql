-- Add lang column to result_templates and change PK to (result_key, lang)
ALTER TABLE public.result_templates ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'pl';

-- Drop existing PK (result_key was the PK)
ALTER TABLE public.result_templates DROP CONSTRAINT IF EXISTS result_templates_pkey;

-- Add new composite PK
ALTER TABLE public.result_templates ADD PRIMARY KEY (result_key, lang);

-- Fix existing PL records
UPDATE public.result_templates SET lang = 'pl' WHERE lang = 'pl';

-- Insert English translations
INSERT INTO public.result_templates (result_key, lang, title, body) VALUES
('RED', 'en', 'High likelihood of NIS2 obligation',
 'Your company meets the key criteria of the NIS2 Directive: the appropriate size, turnover, and operation in a sector covered by Annex I. You are very likely a critical or important entity with an obligation to implement NIS2 requirements — including cybersecurity risk management, incident reporting, and audits. We strongly recommend immediate legal verification and implementation of a compliance programme.'),
('ORANGE', 'en', 'Probable NIS2 obligation (requires verification)',
 'Your company meets some NIS2 criteria, but not all three simultaneously. You may be covered by the directive as an important entity (Annex II) or as a critical entity requiring detailed verification. We recommend conducting due diligence with a cybersecurity-specialist lawyer and implementing basic NIS2 compliance measures.'),
('YELLOW', 'en', 'High likelihood of cybersecurity requirements (supply chain)',
 'Your company is probably not directly subject to NIS2, but operates in the supply chain of entities covered by the directive. An increasing number of large companies and public institutions require their suppliers to hold ISO 27001 certification or meet equivalent security standards. Implementing an information security management system (ISMS) will strengthen your competitive position and reduce contractual risk.'),
('GREEN', 'en', 'Low regulatory risk (for now)',
 'Based on your answers, your company does not meet the criteria for direct coverage under the NIS2 Directive and is not a typical supplier in the NIS2 supply chain. The regulatory risk is currently low. However, monitor the development of regulations — the scope of NIS2 may be extended and supply chain requirements are growing. Basic cybersecurity hygiene remains recommended for every organisation.'),

-- Insert Czech translations
('RED', 'cs', 'Vysoká pravděpodobnost povinnosti NIS2',
 'Vaše společnost splňuje klíčová kritéria směrnice NIS2: odpovídající velikost, obrat a působení v odvětví uvedeném v příloze I. S velkou pravděpodobností jste základním nebo důležitým subjektem s povinností implementovat požadavky NIS2 — včetně řízení rizik kybernetické bezpečnosti, hlášení incidentů a auditů. Doporučujeme okamžité právní ověření a zahájení programu shody.'),
('ORANGE', 'cs', 'Pravděpodobná povinnost NIS2 (k ověření)',
 'Vaše společnost splňuje část kritérií NIS2, nikoli však všechna tři současně. Je možné, že jste zahrnuti do směrnice jako důležitý subjekt (příloha II) nebo jako základní subjekt vyžadující podrobné ověření. Doporučujeme provést due diligence s právníkem specializovaným na kybernetickou bezpečnost a zavést základní opatření pro soulad s NIS2.'),
('YELLOW', 'cs', 'Vysoká pravděpodobnost požadavků na kybernetickou bezpečnost (dodavatelský řetězec)',
 'Vaše společnost pravděpodobně nepodléhá přímo NIS2, ale působí v dodavatelském řetězci subjektů, na které se směrnice vztahuje. Stále více velkých firem a veřejných institucí vyžaduje od svých dodavatelů certifikaci ISO 27001 nebo splnění rovnocenných bezpečnostních standardů. Zavedení systému řízení bezpečnosti informací (ISMS) posílí vaši nabídkovou pozici a sníží smluvní riziko.'),
('GREEN', 'cs', 'Nízké regulační riziko (prozatím)',
 'Na základě vašich odpovědí vaše společnost nesplňuje kritéria pro přímé pokrytí směrnicí NIS2 a není typickým dodavatelem v dodavatelském řetězci subjektů NIS2. Regulační riziko je v současné době nízké. Sledujte však vývoj předpisů — rozsah NIS2 se může rozšiřovat a požadavky dodavatelského řetězce rostou. Základní hygiena kybernetické bezpečnosti zůstává doporučena pro každou organizaci.');
