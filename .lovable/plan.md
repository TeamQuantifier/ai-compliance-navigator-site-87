

## Plan: Aktualizacja tekstu `cycleFormSubtitle` w 3 językach

Zmiana jednej linii w każdym pliku tłumaczeń:

**PL** (`public/locales/pl/translation.json`, linia 4787):
```
"cycleFormSubtitle": "Wypełnij raz — zarejestrujesz się na wszystkie 4 webinary. Webinary odbędą się na platformie <a href='https://quantifier.clickmeeting.com/' target='_blank' class='underline text-primary hover:text-primary/80'>ClickMeeting</a>.",
```

**EN** (`public/locales/en/translation.json`, linia 4963):
```
"cycleFormSubtitle": "Fill in once — you'll be registered for all 4 webinars. Webinars will be hosted on <a href='https://quantifier.clickmeeting.com/' target='_blank' class='underline text-primary hover:text-primary/80'>ClickMeeting</a>.",
```

**CS** (`public/locales/cs/translation.json`, linia 4135):
```
"cycleFormSubtitle": "Vyplňte jednou — budete zaregistrováni na všechny 4 webináře. Webináře se budou konat na platformě <a href='https://quantifier.clickmeeting.com/' target='_blank' class='underline text-primary hover:text-primary/80'>ClickMeeting</a>.",
```

Ponieważ tekst zawiera HTML link, trzeba upewnić się że komponent `CycleRegistrationForm.tsx` renderuje ten subtitle z `dangerouslySetInnerHTML` zamiast jako plain text. Sprawdzę jak jest renderowany i ewentualnie zaktualizuję.

