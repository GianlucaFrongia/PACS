import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: false,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    footer: {
                        load: 'pictures loaded.',
                    },
                    header: {
                        nightmode: 'Nightmode',
                        language: 'Language',
                        logout: 'Log out',
                        tagmanagement: 'Tag Management',
                    },
                    dashboard: {
                        search: 'Search term',
                        tag: 'Tags',
                        sort: 'Sort',
                        or_search: 'OR-Search',
                        and_search: 'AND-Search',
                        sortlist: {
                            default: 'Default',
                            hue: 'Hue',
                            brightness: 'Brightness',
                            saturation: 'Saturation',
                            coverage: 'Coverage',
                        }
                    },
                    detailview: {
                        description: 'Description',
                        magnification: 'Magnification',
                        url: 'URL',
                        tag: 'Tags',

                        hue: 'Hue',
                        saturation: 'Saturation',
                        brightness: 'Brightness',
                        coverage: 'Coverage',
                    }
                }
            },
            de: {
                translation: {
                    footer: {
                        load: 'Bilder geladen.',
                    },
                    header: {
                        nightmode: 'Nachtmodus',
                        language: 'Sprache',
                        logout: 'Ausloggen',
                        tagmanagement: 'Tagverwaltung',
                    },
                    dashboard: {
                        search: 'Suchbegriff',
                        tag: 'Tags',
                        sort: 'Sortierung',
                        or_search: 'ODER-Suche',
                        and_search: 'UND-Suche',
                        sortlist: {
                            default: 'Default',
                            hue: 'Farbwert',
                            brightness: 'Helligkeit',
                            saturation: 'Sättigung',
                            coverage: 'Coverage',
                        }
                    },
                    detailview: {
                        description: 'Beschreibung',
                        magnification: 'Vergrösserung',
                        url: 'URL',
                        tag: 'Tags',

                        hue: 'Farbwert',
                        saturation: 'Sättigung',
                        brightness: 'Helligkeit',
                        coverage: 'Coverage',
                    }
                },

            },
            fr: {
                translation: {
                    footer: {
                        load: 'images chargées.',
                    },
                    header: {
                        nightmode: 'Mode nuit',
                        language: 'Langue',
                        logout: 'Se déconnecter',
                        tagmanagement: 'Gestion des tags',
                    },
                    dashboard: {
                        search: 'Mots-clés',
                        tag: 'Tags',
                        sort: 'Triage',
                        or_search: 'OR-Suivre',
                        and_search: 'ET-Suivre',
                        sortlist: {
                            default: 'Défaut',
                            hue: 'Teine',
                            brightness: 'Luminosité',
                            saturation: 'Saturation',
                            coverage: 'Couverture',
                        }
                    },
                    detailview: {
                        description: 'Description',
                        magnification: 'Grossissement',
                        url: 'URL',
                        tag: 'Tags',

                        hue: 'Teinte',
                        saturation: 'Saturation',
                        brightness: 'Luminosité',
                        coverage: 'Couverture',
                    }
                },

            }
        }
    });

export default i18n;