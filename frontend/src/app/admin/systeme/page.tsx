"use client";
import { useState, useRef } from "react";
import {
  Plus, Trash2, UserPlus, LogIn, CreditCard, Tag, Heart, EyeOff,
  ChevronDown, Building2, Image as ImageIcon, MapPin, Sparkles, Award,
  Users, CalendarClock, Link2, Megaphone, Upload, Quote, MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockNewsBanners } from "@/lib/mockData";

function ToggleSwitch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-full transition-colors shrink-0 ${on ? "bg-green-500" : "bg-gray-300"}`}
      style={{ width: 40, height: 22 }}>
      <span
        className="absolute top-0.5 bg-white rounded-full shadow transition-all"
        style={{ width: 18, height: 18, left: on ? 20 : 2 }}
      />
    </button>
  );
}

function CollapsibleSection({ icon: Icon, title, subtitle, defaultOpen = true, children }: { icon: any; title: string; subtitle: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card p-6">
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
            <Icon size={18} style={{ color: "#1A3C6E" }} />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
          </div>
        </div>
        <ChevronDown size={18} className={`shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pt-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Collapsible({ icon: Icon, title, subtitle, defaultOpen, children }: { icon: any; title: string; subtitle: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
            <Icon size={15} style={{ color: "#1A3C6E" }} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800">{title}</p>
            <p className="text-xs text-gray-400 truncate">{subtitle}</p>
          </div>
        </div>
        <ChevronDown size={16} className={`shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 pt-1 border-t border-gray-50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type RegField = { id: string; label: string; obligatoire: boolean; actif: boolean };
const initialRegFields: RegField[] = [
  { id: "nom",       label: "Nom complet",         obligatoire: true,  actif: true },
  { id: "email",     label: "Adresse email",       obligatoire: true,  actif: true },
  { id: "telephone", label: "Numéro de téléphone", obligatoire: true,  actif: true },
  { id: "naissance", label: "Date de naissance",   obligatoire: false, actif: true },
  { id: "genre",     label: "Genre",               obligatoire: false, actif: true },
  { id: "adresse",   label: "Adresse postale",     obligatoire: false, actif: false },
  { id: "photo",     label: "Photo de profil",     obligatoire: false, actif: true },
];

type EventRegField = { id: string; label: string; obligatoire: boolean; actif: boolean };
const initialEventRegFields: EventRegField[] = [
  { id: "nom",       label: "Nom",                 obligatoire: true,  actif: true },
  { id: "prenoms",   label: "Prénoms",             obligatoire: true,  actif: true },
  { id: "telephone", label: "Téléphone",           obligatoire: true,  actif: true },
  { id: "email",     label: "Email",               obligatoire: true,  actif: true },
  { id: "places",    label: "Nombre de places",    obligatoire: true,  actif: true },
];

type LoginOption = { id: string; label: string; description: string; actif: boolean };
const initialLoginOptions: LoginOption[] = [
  { id: "email",     label: "Connexion par email",                     description: "Le fidèle peut se connecter avec son adresse email et son mot de passe", actif: true },
  { id: "telephone", label: "Connexion par numéro de téléphone",       description: "Le fidèle peut se connecter avec son numéro de téléphone et son mot de passe", actif: true },
  { id: "2fa",       label: "Authentification à deux facteurs (2FA)",  description: "Demander un code de vérification supplémentaire envoyé par SMS ou email", actif: false },
];

type PaymentMethod = { id: string; label: string; provider: string; color: string; actif: boolean };
const initialPaymentMethods: PaymentMethod[] = [
  { id: "wave",   label: "Wave CI",                          provider: "CinetPay", color: "#1A3C6E", actif: true },
  { id: "orange", label: "Orange Money",                     provider: "CinetPay", color: "#F97316", actif: true },
  { id: "mtn",    label: "MTN Money",                        provider: "CinetPay", color: "#EAB308", actif: true },
  { id: "moov",   label: "Moov Money",                       provider: "CinetPay", color: "#2563EB", actif: true },
  { id: "carte",  label: "Carte bancaire (Visa / Mastercard)", provider: "CinetPay", color: "#6B21A8", actif: true },
];

type DonCategory = { id: number; label: string; color: string };
const initialCategories: DonCategory[] = [
  { id: 1, label: "Général",      color: "#1A3C6E" },
  { id: 2, label: "Construction", color: "#C8941A" },
  { id: 3, label: "Missions",     color: "#7C3AED" },
  { id: 4, label: "Social",       color: "#EF4444" },
  { id: 5, label: "Éducation",    color: "#16a34a" },
];
const palette = ["#1A3C6E", "#C8941A", "#7C3AED", "#16a34a", "#EF4444", "#0EA5E9", "#DB2777", "#65A30D"];

type DonInfoField = { id: string; label: string; obligatoire: boolean; actif: boolean };
const initialDonInfoFields: DonInfoField[] = [
  { id: "nom",       label: "Nom",                obligatoire: true,  actif: true },
  { id: "prenoms",   label: "Prénoms",            obligatoire: true,  actif: true },
  { id: "telephone", label: "Téléphone",          obligatoire: true,  actif: true },
  { id: "email",     label: "Email",              obligatoire: false, actif: true },
  { id: "message",   label: "Message",            obligatoire: false, actif: true },
];

type ContactFormField = { id: string; label: string; obligatoire: boolean; actif: boolean };
const initialContactFormFields: ContactFormField[] = [
  { id: "nom",     label: "Nom",         obligatoire: true,  actif: true },
  { id: "email",   label: "Email",       obligatoire: true,  actif: true },
  { id: "sujet",   label: "Sujet",       obligatoire: true,  actif: true },
  { id: "message", label: "Message",     obligatoire: true,  actif: true },
  { id: "fichier", label: "Pièce jointe", obligatoire: false, actif: true },
];

type ContactSubject = { id: string; label: string };
const initialContactSubjects: ContactSubject[] = [
  { id: "info",       label: "Information générale" },
  { id: "formations", label: "Formations E-Learning" },
  { id: "evenements", label: "Événements" },
  { id: "dons",       label: "Dons et financement" },
  { id: "autre",      label: "Autre" },
];

/* ── Informations générales MCTD ── */
type ChurchStat = { id: string; label: string; value: string; suffix: string; visible: boolean };
const initialChurchStats: ChurchStat[] = [
  { id: "fideles",    label: "Fidèles",        value: "2500", suffix: "+", visible: true },
  { id: "modules",    label: "Modules",        value: "48",   suffix: "",  visible: true },
  { id: "evenements", label: "Événements/an",  value: "120",  suffix: "+", visible: true },
];

type EngagementItem = { id: string; title: string; content: string; color: string };
const initialEngagements: EngagementItem[] = [
  { id: "vision",  title: "Notre Vision",
    content: "Être un centre de référence pour la formation catholique et la transformation spirituelle en Côte d'Ivoire et en Afrique de l'Ouest, rayonnant l'amour du Christ dans toutes les sphères de la société.",
    color: "#1A3C6E" },
  { id: "mission", title: "Notre Mission",
    content: "Évangéliser, former et accompagner chaque fidèle dans sa croissance spirituelle, intellectuelle et humaine, en s'appuyant sur l'enseignement de l'Église catholique et la force de la communauté.",
    color: "#C8941A" },
  { id: "valeurs", title: "Nos Valeurs",
    content: "Foi authentique • Amour fraternel • Excellence spirituelle • Solidarité concrète • Intégrité dans le service • Ouverture et accueil de tous",
    color: "#1A3C6E" },
];

type TeamMember = { id: string; name: string; role: string; description: string; photoUrl: string; visible: boolean };
const initialTeamMembers: TeamMember[] = [
  { id: "1", name: "Fr. Jean-Baptiste Gervais EHUY", role: "Fondateur et Berger du MCTD", description: "Porteur du mandat « Faire sortir le peuple de la pauvreté », Fr. Jean-Baptiste Gervais EHUY conduit le Ministère vers le développement intégral à la lumière de l'Évangile.", photoUrl: "", visible: true },
  { id: "2", name: "Clarisse EHUY",         role: "Co-fondatrice",          description: "Aux côtés de son époux depuis 1987 et mariée en 1994, Clarisse EHUY accompagne les familles et les femmes dans leur cheminement spirituel et personnel.", photoUrl: "", visible: true },
  { id: "3", name: "Sœur Marie-Claire Bamba", role: "Responsable E-Learning", description: "Docteure en sciences de l'éducation, Sœur Marie-Claire développe les programmes de formation théologique et spirituelle du MCTD.", photoUrl: "", visible: true },
];

type ProgramItem = { id: string; label: string; horaire: string; visible: boolean };
const initialProgramItems: ProgramItem[] = [
  { id: "1", label: "Culte du dimanche", horaire: "Dimanche, 08h00 et 10h30",   visible: true },
  { id: "2", label: "Chapelet",          horaire: "Mercredi, 18h30",            visible: true },
  { id: "3", label: "Adoration",         horaire: "Vendredi, 17h00",            visible: true },
  { id: "4", label: "Catéchèse",         horaire: "Samedi, 09h00",              visible: true },
];

type Testimonial = { id: string; name: string; role: string; text: string; actif: boolean };
const initialTestimonials: Testimonial[] = [
  { id: "1", name: "Adja Koné",              role: "Fidèle depuis 5 ans",       text: "MCTD a transformé ma vie spirituelle. Les formations en ligne m'ont permis d'approfondir ma foi même depuis mon lieu de travail.", actif: true },
  { id: "2", name: "Jean-Baptiste Yao",      role: "Membre du chœur",           text: "La communauté MCTD est une vraie famille. J'y ai trouvé des frères et sœurs qui m'ont soutenu dans les moments difficiles.",       actif: true },
  { id: "3", name: "Marie-Thérèse Ouédraogo", role: "Responsable des jeunes",   text: "Les événements organisés par MCTD sont exceptionnels. Chaque retraite est une nouvelle rencontre avec Dieu.",                    actif: true },
];

type SocialLink = { id: string; platform: string; url: string; visible: boolean };
const initialSocialLinks: SocialLink[] = [
  { id: "facebook",  platform: "Facebook",  url: "https://facebook.com/mctd",  visible: true },
  { id: "youtube",   platform: "YouTube",   url: "https://youtube.com/@mctd",  visible: true },
  { id: "instagram", platform: "Instagram", url: "https://instagram.com/mctd", visible: true },
];

type NewsBanner = { id: string; text: string; color: string; mode: "defilant" | "clignotant"; actif: boolean };
const initialNewsBanners: NewsBanner[] = mockNewsBanners;

export default function AdminSystemePage() {
  const [regFields, setRegFields] = useState(initialRegFields);
  const [newField, setNewField] = useState("");
  const [loginOptions, setLoginOptions] = useState(initialLoginOptions);
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [deleteCategory, setDeleteCategory] = useState<DonCategory | null>(null);
  const [donAnonymousEnabled, setDonAnonymousEnabled] = useState(true);
  const [donInfoFields, setDonInfoFields] = useState(initialDonInfoFields);
  const [newDonInfoField, setNewDonInfoField] = useState("");
  const [deleteDonInfoField, setDeleteDonInfoField] = useState<DonInfoField | null>(null);
  const [contactFields, setContactFields] = useState(initialContactFormFields);
  const [newContactField, setNewContactField] = useState("");
  const [deleteContactField, setDeleteContactField] = useState<ContactFormField | null>(null);
  const [contactSubjects, setContactSubjects] = useState(initialContactSubjects);
  const [newContactSubject, setNewContactSubject] = useState("");
  const [eventRegFields, setEventRegFields] = useState(initialEventRegFields);
  const [newEventRegField, setNewEventRegField] = useState("");

  /* ── Informations générales MCTD ── */
  const [churchInfo, setChurchInfo] = useState({
    nom: "Ministère Catholique de Transformation et de Développement",
    slogan: "Vivre de la vie de Dieu",
    logoUrl: "",
    description: "Le MCTD est une plateforme d'évangélisation et de développement intégral — spirituel, personnel et professionnel — basée à Abidjan, ouverte à tous sans distinction de religion ou de classe sociale.",
    vision: "Voir chaque personne accéder au développement intégral à la lumière de l'Évangile, dans son être, sa famille et son travail — et vivre de la vie de Dieu au quotidien.",
    adresse: "Cocody Riviera 3, cité EECI, Abidjan, Côte d'Ivoire",
    latitude: "5.3599",
    longitude: "-3.9810",
    telephone: "+225 XX XX XX XX XX",
    email: "contact@jbgmctd.org",
    fondationTitre: "Une histoire de foi et de service",
    fondationTexte:
      "Le Ministère Catholique de Transformation et de Développement a été fondé par Fr. Jean-Baptiste Gervais EHUY, aux côtés de son épouse Clarisse, autour d'un mandat reçu de Dieu : « Faire sortir le peuple de la pauvreté » — spirituelle, personnelle et professionnelle.\n\nInspiré du mandat biblique d'Exode 3, 7-8, le MCTD conduit chacun vers la pleine mesure de sa vocation, en lui donnant les moyens de « vivre de la vie de Dieu » au quotidien — dans sa foi, sa famille et son travail.\n\nAujourd'hui, le MCTD rassemble une communauté grandissante à Abidjan et au-delà, avec des programmes touchant la formation spirituelle, la jeunesse, la famille, l'entrepreneuriat et l'action sociale, et lance sa plateforme digitale intégrée pour rendre ses ressources accessibles à tous, où qu'ils se trouvent.",
    missionTitre: "Faire sortir le peuple de la pauvreté",
    missionTexte:
      "Le MCTD est une plateforme d'évangélisation et de développement intégral, fondée par Fr. Jean-Baptiste Gervais EHUY et son épouse Clarisse, ouverte à tous sans distinction de religion ou de classe sociale.\n\nNotre vision est d'accompagner chaque personne vers la pleine mesure de sa vocation, en lui donnant les moyens de « vivre de la vie de Dieu » au quotidien.",
    descriptionVisible: true,
    visionVisible: true,
    localisationVisible: true,
    contactsVisible: true,
  });
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [churchStats, setChurchStats] = useState(initialChurchStats);
  const [engagements, setEngagements] = useState(initialEngagements);
  const [deleteEngagement, setDeleteEngagement] = useState<EngagementItem | null>(null);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [programItems, setProgramItems] = useState(initialProgramItems);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  const [newsBanners, setNewsBanners] = useState(initialNewsBanners);

  const toggleRegFieldObligatoire = (id: string) => setRegFields((fs) => fs.map((f) => (f.id === id ? { ...f, obligatoire: !f.obligatoire } : f)));
  const toggleRegFieldActif       = (id: string) => setRegFields((fs) => fs.map((f) => (f.id === id ? { ...f, actif: !f.actif } : f)));
  const toggleLoginOption  = (id: string) => setLoginOptions((os) => os.map((o) => (o.id === id ? { ...o, actif: !o.actif } : o)));
  const togglePaymentMethod = (id: string) => setPaymentMethods((ms) => ms.map((m) => (m.id === id ? { ...m, actif: !m.actif } : m)));
  const toggleDonInfoFieldObligatoire = (id: string) => setDonInfoFields((fs) => fs.map((f) => (f.id === id ? { ...f, obligatoire: !f.obligatoire } : f)));
  const toggleDonInfoFieldActif       = (id: string) => setDonInfoFields((fs) => fs.map((f) => (f.id === id ? { ...f, actif: !f.actif } : f)));
  const toggleContactFieldObligatoire = (id: string) => setContactFields((fs) => fs.map((f) => (f.id === id ? { ...f, obligatoire: !f.obligatoire } : f)));
  const toggleContactFieldActif       = (id: string) => setContactFields((fs) => fs.map((f) => (f.id === id ? { ...f, actif: !f.actif } : f)));
  const toggleEventRegFieldObligatoire = (id: string) => setEventRegFields((fs) => fs.map((f) => (f.id === id ? { ...f, obligatoire: !f.obligatoire } : f)));
  const toggleEventRegFieldActif       = (id: string) => setEventRegFields((fs) => fs.map((f) => (f.id === id ? { ...f, actif: !f.actif } : f)));

  const addField = () => {
    const label = newField.trim();
    if (!label) return;
    setRegFields((fs) => [...fs, { id: `custom-${Date.now()}`, label, obligatoire: false, actif: true }]);
    setNewField("");
  };

  const addCategory = () => {
    const label = newCategory.trim();
    if (!label) return;
    setCategories((cs) => [...cs, { id: Date.now(), label, color: palette[cs.length % palette.length] }]);
    setNewCategory("");
  };

  const addDonInfoField = () => {
    const label = newDonInfoField.trim();
    if (!label) return;
    setDonInfoFields((fs) => [...fs, { id: `custom-${Date.now()}`, label, obligatoire: false, actif: true }]);
    setNewDonInfoField("");
  };

  const addContactField = () => {
    const label = newContactField.trim();
    if (!label) return;
    setContactFields((fs) => [...fs, { id: `custom-${Date.now()}`, label, obligatoire: false, actif: true }]);
    setNewContactField("");
  };

  const addEventRegField = () => {
    const label = newEventRegField.trim();
    if (!label) return;
    setEventRegFields((fs) => [...fs, { id: `custom-${Date.now()}`, label, obligatoire: false, actif: true }]);
    setNewEventRegField("");
  };

  const addContactSubject = () => {
    const label = newContactSubject.trim();
    if (!label) return;
    setContactSubjects((s) => [...s, { id: `sujet-${Date.now()}`, label }]);
    setNewContactSubject("");
  };
  const deleteContactSubject = (id: string) => setContactSubjects((s) => s.filter((x) => x.id !== id));

  /* ── Handlers Informations générales MCTD ── */
  const updateChurchInfo = (field: keyof typeof churchInfo, value: string | boolean) =>
    setChurchInfo((c) => ({ ...c, [field]: value }));

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateChurchInfo("logoUrl", URL.createObjectURL(file));
    e.target.value = "";
  };

  const updateChurchStat = (id: string, patch: Partial<ChurchStat>) =>
    setChurchStats((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const toggleChurchStatVisible = (id: string) =>
    setChurchStats((s) => s.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x)));
  const deleteChurchStat = (id: string) => setChurchStats((s) => s.filter((x) => x.id !== id));
  const addChurchStat = () =>
    setChurchStats((s) => [...s, { id: `stat-${Date.now()}`, label: "Nouveau chiffre", value: "0", suffix: "", visible: true }]);

  const updateEngagement = (id: string, patch: Partial<EngagementItem>) =>
    setEngagements((es) => es.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const addEngagement = () =>
    setEngagements((es) => [...es, { id: `eng-${Date.now()}`, title: "Nouvel engagement", content: "", color: palette[es.length % palette.length] }]);
  const confirmDeleteEngagement = () => {
    if (!deleteEngagement) return;
    setEngagements((es) => es.filter((x) => x.id !== deleteEngagement.id));
    setDeleteEngagement(null);
  };

  const updateTeamMember = (id: string, patch: Partial<TeamMember>) =>
    setTeamMembers((t) => t.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const toggleTeamMemberVisible = (id: string) =>
    setTeamMembers((t) => t.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x)));
  const deleteTeamMember = (id: string) => setTeamMembers((t) => t.filter((x) => x.id !== id));
  const addTeamMember = () =>
    setTeamMembers((t) => [...t, { id: `team-${Date.now()}`, name: "Nouveau membre", role: "Rôle", description: "", photoUrl: "", visible: true }]);
  const handleTeamPhotoChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateTeamMember(id, { photoUrl: URL.createObjectURL(file) });
    e.target.value = "";
  };

  const updateProgramItem = (id: string, patch: Partial<ProgramItem>) =>
    setProgramItems((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const toggleProgramItemVisible = (id: string) =>
    setProgramItems((p) => p.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x)));
  const deleteProgramItem = (id: string) => setProgramItems((p) => p.filter((x) => x.id !== id));
  const addProgramItem = () =>
    setProgramItems((p) => [...p, { id: `prog-${Date.now()}`, label: "Nouveau rendez-vous", horaire: "", visible: true }]);

  const updateTestimonial = (id: string, patch: Partial<Testimonial>) =>
    setTestimonials((t) => t.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const toggleTestimonialActif = (id: string) =>
    setTestimonials((t) => t.map((x) => (x.id === id ? { ...x, actif: !x.actif } : x)));
  const deleteTestimonial = (id: string) => setTestimonials((t) => t.filter((x) => x.id !== id));
  const addTestimonial = () =>
    setTestimonials((t) => [...t, { id: `temoin-${Date.now()}`, name: "Nouveau témoignage", role: "Fidèle MCTD", text: "", actif: true }]);

  const updateSocialLink = (id: string, patch: Partial<SocialLink>) =>
    setSocialLinks((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const toggleSocialLinkVisible = (id: string) =>
    setSocialLinks((l) => l.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x)));
  const deleteSocialLink = (id: string) => setSocialLinks((l) => l.filter((x) => x.id !== id));
  const addSocialLink = () =>
    setSocialLinks((l) => [...l, { id: `social-${Date.now()}`, platform: "Réseau social", url: "", visible: true }]);

  const updateNewsBanner = (id: string, patch: Partial<NewsBanner>) =>
    setNewsBanners((b) => b.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const toggleNewsBannerActif = (id: string) =>
    setNewsBanners((b) => b.map((x) => (x.id === id ? { ...x, actif: !x.actif } : x)));
  const deleteNewsBanner = (id: string) => setNewsBanners((b) => b.filter((x) => x.id !== id));
  const addNewsBanner = () =>
    setNewsBanners((b) => [...b, { id: `banner-${Date.now()}`, text: "", color: palette[b.length % palette.length], mode: "defilant", actif: true }]);

  const confirmDeleteCategory = () => {
    if (!deleteCategory) return;
    setCategories((cs) => cs.filter((c) => c.id !== deleteCategory.id));
    setDeleteCategory(null);
  };

  const confirmDeleteDonInfoField = () => {
    if (!deleteDonInfoField) return;
    setDonInfoFields((fs) => fs.filter((f) => f.id !== deleteDonInfoField.id));
    setDeleteDonInfoField(null);
  };

  const confirmDeleteContactField = () => {
    if (!deleteContactField) return;
    setContactFields((fs) => fs.filter((f) => f.id !== deleteContactField.id));
    setDeleteContactField(null);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold" style={{ color: "#1A3C6E" }}>Système</h1>
        <p className="text-gray-500 text-sm mt-0.5">Configuration globale de la plateforme MCTD</p>
      </div>

      {/* Informations générales MCTD */}
      <CollapsibleSection icon={Building2} title="Informations générales MCTD" subtitle="Contenu public : identité, présentation, équipe, programme, réseaux…">
        <div className="space-y-3">

          {/* Identité */}
          <Collapsible icon={ImageIcon} title="Identité" subtitle="Nom, slogan et logo de l'église" defaultOpen>
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden shrink-0 bg-gray-50">
                  {churchInfo.logoUrl ? (
                    <img src={churchInfo.logoUrl} alt="Logo MCTD" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={20} className="text-gray-300" />
                  )}
                </div>
                <div>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                  <button type="button" onClick={() => logoInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    <Upload size={13} /> Changer le logo
                  </button>
                  <p className="text-xs text-gray-400 mt-1.5">PNG ou SVG recommandé, fond transparent</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Nom de l'église</label>
                  <input value={churchInfo.nom} onChange={(e) => updateChurchInfo("nom", e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Slogan</label>
                  <input value={churchInfo.slogan} onChange={(e) => updateChurchInfo("slogan", e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                </div>
              </div>
            </div>
          </Collapsible>

          {/* Présentation */}
          <Collapsible icon={Sparkles} title="Présentation" subtitle="Description et vision affichées sur le site">
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-gray-500">Description</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: churchInfo.descriptionVisible ? "#166534" : "#6B7280" }}>
                      {churchInfo.descriptionVisible ? "Visible" : "Masquée"}
                    </span>
                    <ToggleSwitch on={churchInfo.descriptionVisible} onClick={() => updateChurchInfo("descriptionVisible", !churchInfo.descriptionVisible)} />
                  </div>
                </div>
                <textarea value={churchInfo.description} onChange={(e) => updateChurchInfo("description", e.target.value)} rows={3}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] resize-none" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-gray-500">Vision</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: churchInfo.visionVisible ? "#166534" : "#6B7280" }}>
                      {churchInfo.visionVisible ? "Visible" : "Masquée"}
                    </span>
                    <ToggleSwitch on={churchInfo.visionVisible} onClick={() => updateChurchInfo("visionVisible", !churchInfo.visionVisible)} />
                  </div>
                </div>
                <textarea value={churchInfo.vision} onChange={(e) => updateChurchInfo("vision", e.target.value)} rows={3}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] resize-none" />
              </div>
            </div>
          </Collapsible>

          {/* Textes des pages publiques */}
          <Collapsible icon={Building2} title="Textes des pages publiques" subtitle="Notre Fondation (page À propos) et Notre Mission (page d'accueil)">
            <div className="space-y-5 pt-2">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Titre — « Notre Fondation » (page À propos)</label>
                <input value={churchInfo.fondationTitre} onChange={(e) => updateChurchInfo("fondationTitre", e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] mb-2" />
                <label className="block text-xs font-medium text-gray-500 mb-1">Texte descriptif</label>
                <textarea value={churchInfo.fondationTexte} onChange={(e) => updateChurchInfo("fondationTexte", e.target.value)} rows={6}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] resize-none" />
                <p className="text-xs text-gray-400 mt-1">Séparez les paragraphes par une ligne vide.</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Titre — « Notre Mission » (page d'accueil)</label>
                <input value={churchInfo.missionTitre} onChange={(e) => updateChurchInfo("missionTitre", e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] mb-2" />
                <label className="block text-xs font-medium text-gray-500 mb-1">Texte descriptif</label>
                <textarea value={churchInfo.missionTexte} onChange={(e) => updateChurchInfo("missionTexte", e.target.value)} rows={5}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] resize-none" />
                <p className="text-xs text-gray-400 mt-1">Séparez les paragraphes par une ligne vide.</p>
              </div>
            </div>
          </Collapsible>

          {/* Localisation et contacts */}
          <Collapsible icon={MapPin} title="Localisation et contacts" subtitle="Adresse, téléphone et email affichés aux fidèles">
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-gray-500">Adresse / localisation</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: churchInfo.localisationVisible ? "#166534" : "#6B7280" }}>
                      {churchInfo.localisationVisible ? "Visible" : "Masquée"}
                    </span>
                    <ToggleSwitch on={churchInfo.localisationVisible} onClick={() => updateChurchInfo("localisationVisible", !churchInfo.localisationVisible)} />
                  </div>
                </div>
                <input value={churchInfo.adresse} onChange={(e) => updateChurchInfo("adresse", e.target.value)} placeholder="Adresse affichée aux fidèles"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                <p className="text-xs font-medium text-gray-500 mt-3 mb-1">Position géographique sur la carte</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input value={churchInfo.latitude} onChange={(e) => updateChurchInfo("latitude", e.target.value)} placeholder="Latitude (ex : 5.3599)"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                  <input value={churchInfo.longitude} onChange={(e) => updateChurchInfo("longitude", e.target.value)} placeholder="Longitude (ex : -3.9810)"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Détermine l'emplacement du repère affiché sur la carte de la page Contact / À propos.</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-gray-500">Téléphone et email</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: churchInfo.contactsVisible ? "#166534" : "#6B7280" }}>
                      {churchInfo.contactsVisible ? "Visibles" : "Masqués"}
                    </span>
                    <ToggleSwitch on={churchInfo.contactsVisible} onClick={() => updateChurchInfo("contactsVisible", !churchInfo.contactsVisible)} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input value={churchInfo.telephone} onChange={(e) => updateChurchInfo("telephone", e.target.value)} placeholder="Téléphone"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                  <input value={churchInfo.email} onChange={(e) => updateChurchInfo("email", e.target.value)} placeholder="Email"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                </div>
              </div>
            </div>
          </Collapsible>

          {/* Chiffres clés */}
          <Collapsible icon={Award} title="Chiffres clés" subtitle="Statistiques mises en avant sur la page d'accueil">
            <div className="space-y-2 pt-2">
              {churchStats.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                  <input value={s.label} onChange={(e) => updateChurchStat(s.id, { label: e.target.value })} placeholder="Libellé"
                    className="flex-1 min-w-0 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                  <input value={s.value} onChange={(e) => updateChurchStat(s.id, { value: e.target.value })} placeholder="Valeur"
                    className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                  <input value={s.suffix} onChange={(e) => updateChurchStat(s.id, { suffix: e.target.value })} placeholder="Suffixe"
                    className="w-16 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                  <ToggleSwitch on={s.visible} onClick={() => toggleChurchStatVisible(s.id)} />
                  <button onClick={() => deleteChurchStat(s.id)} title="Supprimer ce chiffre"
                    className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              {churchStats.length === 0 && <p className="text-sm text-gray-400 py-2 text-center">Aucun chiffre défini</p>}
            </div>
            <motion.button onClick={addChurchStat} whileTap={{ scale: 0.97 }}
              className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
              <Plus size={15} /> Ajouter un chiffre
            </motion.button>
          </Collapsible>

          {/* Nos engagements */}
          <Collapsible icon={Heart} title="Nos engagements" subtitle="Contenu de Notre Vision, Notre Mission et Nos Valeurs affiché sur la page « À propos »">
            <div className="space-y-3 pt-1">
              {engagements.map((e) => (
                <div key={e.id} className="p-3 rounded-xl border border-gray-100 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 shrink-0">
                      {palette.map((c) => (
                        <button key={c} onClick={() => updateEngagement(e.id, { color: c })} title={c}
                          className="w-4 h-4 rounded-full transition-transform"
                          style={{ backgroundColor: c, transform: e.color === c ? "scale(1.25)" : "scale(1)", boxShadow: e.color === c ? `0 0 0 2px white, 0 0 0 3.5px ${c}` : "none" }} />
                      ))}
                    </div>
                    <input value={e.title} onChange={(ev) => updateEngagement(e.id, { title: ev.target.value })} placeholder="Titre (ex : Notre Vision)"
                      className="flex-1 min-w-0 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#1A3C6E]" />
                    <button onClick={() => setDeleteEngagement(e)} title="Supprimer cet engagement"
                      className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <textarea value={e.content} onChange={(ev) => updateEngagement(e.id, { content: ev.target.value })} rows={3} placeholder="Contenu affiché sous le titre..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] resize-none" />
                </div>
              ))}
              {engagements.length === 0 && <p className="text-sm text-gray-400 py-2 text-center">Aucun engagement défini</p>}
            </div>
            <motion.button onClick={addEngagement} whileTap={{ scale: 0.97 }}
              className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
              <Plus size={15} /> Ajouter un engagement
            </motion.button>
          </Collapsible>

          {/* Équipe */}
          <Collapsible icon={Users} title="Équipe" subtitle="Membres de l'équipe et leurs photos">
            <div className="space-y-3 pt-1">
              {teamMembers.map((m) => (
                <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                      {m.photoUrl ? <img src={m.photoUrl} alt={m.name} className="w-full h-full object-cover" /> : <Users size={16} className="text-gray-300" />}
                    </div>
                    <label htmlFor={`team-photo-${m.id}`} title="Changer la photo"
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white cursor-pointer shadow"
                      style={{ backgroundColor: "#1A3C6E" }}>
                      <Upload size={10} />
                    </label>
                    <input id={`team-photo-${m.id}`} type="file" accept="image/*" className="hidden" onChange={(e) => handleTeamPhotoChange(m.id, e)} />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="grid sm:grid-cols-2 gap-2">
                      <input value={m.name} onChange={(e) => updateTeamMember(m.id, { name: e.target.value })} placeholder="Nom"
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                      <input value={m.role} onChange={(e) => updateTeamMember(m.id, { role: e.target.value })} placeholder="Rôle / fonction"
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                    </div>
                    <textarea value={m.description} onChange={(e) => updateTeamMember(m.id, { description: e.target.value })} rows={2} placeholder="Description (présentation du membre)"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] resize-none" />
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <ToggleSwitch on={m.visible} onClick={() => toggleTeamMemberVisible(m.id)} />
                    <button onClick={() => deleteTeamMember(m.id)} title="Retirer ce membre"
                      className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
              {teamMembers.length === 0 && <p className="text-sm text-gray-400 py-2 text-center">Aucun membre ajouté</p>}
            </div>
            <motion.button onClick={addTeamMember} whileTap={{ scale: 0.97 }}
              className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
              <Plus size={15} /> Ajouter un membre
            </motion.button>
          </Collapsible>

          {/* Programme */}
          <Collapsible icon={CalendarClock} title="Programme" subtitle="Cultes et rencontres hebdomadaires">
            <div className="divide-y divide-gray-50 mb-3">
              {programItems.map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-2.5">
                  <div className="flex-1 min-w-0 grid sm:grid-cols-2 gap-2">
                    <input value={p.label} onChange={(e) => updateProgramItem(p.id, { label: e.target.value })} placeholder="Intitulé"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                    <input value={p.horaire} onChange={(e) => updateProgramItem(p.id, { horaire: e.target.value })} placeholder="Horaire"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ToggleSwitch on={p.visible} onClick={() => toggleProgramItemVisible(p.id)} />
                    <button onClick={() => deleteProgramItem(p.id)} title="Supprimer ce rendez-vous"
                      className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
              {programItems.length === 0 && <p className="text-sm text-gray-400 py-2 text-center">Aucun rendez-vous défini</p>}
            </div>
            <motion.button onClick={addProgramItem} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
              <Plus size={15} /> Ajouter un rendez-vous
            </motion.button>
          </Collapsible>

          {/* Témoignages */}
          <Collapsible icon={Quote} title="Témoignages" subtitle="Avis et témoignages des fidèles affichés sur l'accueil">
            <div className="space-y-3 pt-1">
              {testimonials.map((t) => (
                <div key={t.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="grid sm:grid-cols-2 gap-2">
                      <input value={t.name} onChange={(e) => updateTestimonial(t.id, { name: e.target.value })} placeholder="Nom"
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                      <input value={t.role} onChange={(e) => updateTestimonial(t.id, { role: e.target.value })} placeholder="Rôle / statut"
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                    </div>
                    <textarea value={t.text} onChange={(e) => updateTestimonial(t.id, { text: e.target.value })} rows={2} placeholder="Texte du témoignage..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] resize-none" />
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <ToggleSwitch on={t.actif} onClick={() => toggleTestimonialActif(t.id)} />
                    <button onClick={() => deleteTestimonial(t.id)} title="Supprimer ce témoignage"
                      className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
              {testimonials.length === 0 && <p className="text-sm text-gray-400 py-2 text-center">Aucun témoignage ajouté</p>}
            </div>
            <motion.button onClick={addTestimonial} whileTap={{ scale: 0.97 }}
              className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
              <Plus size={15} /> Ajouter un témoignage
            </motion.button>
          </Collapsible>

          {/* Réseaux sociaux */}
          <Collapsible icon={Link2} title="Réseaux sociaux" subtitle="Liens vers les pages et comptes officiels">
            <div className="divide-y divide-gray-50 mb-3">
              {socialLinks.map((l) => (
                <div key={l.id} className="flex items-center gap-3 py-2.5">
                  <div className="flex-1 min-w-0 grid sm:grid-cols-[160px_1fr] gap-2">
                    <input value={l.platform} onChange={(e) => updateSocialLink(l.id, { platform: e.target.value })} placeholder="Réseau"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                    <input value={l.url} onChange={(e) => updateSocialLink(l.id, { url: e.target.value })} placeholder="https://..."
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]" />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ToggleSwitch on={l.visible} onClick={() => toggleSocialLinkVisible(l.id)} />
                    <button onClick={() => deleteSocialLink(l.id)} title="Supprimer ce lien"
                      className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
              {socialLinks.length === 0 && <p className="text-sm text-gray-400 py-2 text-center">Aucun lien défini</p>}
            </div>
            <motion.button onClick={addSocialLink} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
              <Plus size={15} /> Ajouter un lien
            </motion.button>
          </Collapsible>
        </div>
      </CollapsibleSection>

      {/* Bandeau d'informations */}
      <CollapsibleSection icon={Megaphone} title="Bandeau d'informations" subtitle="Messages défilants ou clignotants affichés en haut de la page d'accueil, au-dessus du message de bienvenue">
        <div className="space-y-3 mb-4">
          {newsBanners.map((b) => (
            <div key={b.id} className="p-3 rounded-xl border border-gray-100 space-y-3">
              <div className="flex items-start gap-3">
                <textarea value={b.text} onChange={(e) => updateNewsBanner(b.id, { text: e.target.value })} rows={2} placeholder="Texte de l'annonce..."
                  className="flex-1 min-w-0 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E] resize-none" />
                <button onClick={() => deleteNewsBanner(b.id)} title="Supprimer ce message"
                  className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0">
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">Couleur</span>
                  <div className="flex items-center gap-1.5">
                    {palette.map((c) => (
                      <button key={c} onClick={() => updateNewsBanner(b.id, { color: c })} title={c}
                        className="w-5 h-5 rounded-full transition-transform"
                        style={{ backgroundColor: c, transform: b.color === c ? "scale(1.2)" : "scale(1)", boxShadow: b.color === c ? `0 0 0 2px white, 0 0 0 3.5px ${c}` : "none" }} />
                    ))}
                  </div>
                </div>
                <span className="w-px h-5 bg-gray-200 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">Effet</span>
                  <div className="flex gap-1.5">
                    {(["defilant", "clignotant"] as const).map((mode) => (
                      <button key={mode} onClick={() => updateNewsBanner(b.id, { mode })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${b.mode === mode ? "text-white border-transparent" : "text-gray-600 border-gray-200"}`}
                        style={b.mode === mode ? { backgroundColor: "#1A3C6E" } : {}}>
                        {mode === "defilant" ? "Défilant" : "Clignotant"}
                      </button>
                    ))}
                  </div>
                </div>
                <span className="w-px h-5 bg-gray-200 hidden sm:block" />
                <div className="flex items-center gap-2.5 ml-auto">
                  <span className="text-xs font-medium" style={{ color: b.actif ? "#166534" : "#6B7280" }}>
                    {b.actif ? "Activé" : "Désactivé"}
                  </span>
                  <ToggleSwitch on={b.actif} onClick={() => toggleNewsBannerActif(b.id)} />
                </div>
              </div>
            </div>
          ))}
          {newsBanners.length === 0 && <p className="text-sm text-gray-400 py-3 text-center">Aucun message défini</p>}
        </div>
        <motion.button onClick={addNewsBanner} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
          <Plus size={15} /> Ajouter un message
        </motion.button>
      </CollapsibleSection>

      {/* Formulaire de contact */}
      <CollapsibleSection icon={MessageSquare} title="Formulaire de contact" subtitle="Champs et sujets proposés aux visiteurs sur la page « Contact »">
        <div className="divide-y divide-gray-50 mb-4">
          {contactFields.map((f) => (
            <div key={f.id} className="flex items-center justify-between gap-4 py-3">
              <p className={`text-sm font-medium ${f.actif ? "text-gray-800" : "text-gray-400"}`}>{f.label}</p>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2.5 transition-opacity ${!f.actif ? "opacity-40 pointer-events-none" : ""}`}>
                  <span className="text-xs font-medium" style={{ color: f.obligatoire ? "#991B1B" : "#6B7280" }}>
                    {f.obligatoire ? "Obligatoire" : "Optionnel"}
                  </span>
                  <ToggleSwitch on={f.obligatoire} onClick={() => toggleContactFieldObligatoire(f.id)} />
                </div>
                <span className="w-px h-5 bg-gray-200" />
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-medium" style={{ color: f.actif ? "#166534" : "#6B7280" }}>
                    {f.actif ? "Activé" : "Désactivé"}
                  </span>
                  <ToggleSwitch on={f.actif} onClick={() => toggleContactFieldActif(f.id)} />
                </div>
                <button onClick={() => setDeleteContactField(f)} title="Supprimer ce champ"
                  className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {contactFields.length === 0 && (
            <p className="text-sm text-gray-400 py-3 text-center">Aucun champ défini</p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={newContactField}
            onChange={(e) => setNewContactField(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addContactField(); }}
            placeholder="Nouveau champ (ex : Numéro de téléphone)"
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
          />
          <motion.button onClick={addContactField} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
            <Plus size={15} /> Ajouter
          </motion.button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-700 mb-1">Sujets proposés dans le formulaire</p>
          <p className="text-xs text-gray-400 mb-3">Options affichées dans la liste déroulante « Sujet » de la page Contact</p>
          <div className="divide-y divide-gray-50 mb-4">
            {contactSubjects.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 py-2.5">
                <p className="text-sm font-medium text-gray-800">{s.label}</p>
                <button onClick={() => deleteContactSubject(s.id)} title="Supprimer ce sujet"
                  className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            {contactSubjects.length === 0 && (
              <p className="text-sm text-gray-400 py-3 text-center">Aucun sujet défini</p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              value={newContactSubject}
              onChange={(e) => setNewContactSubject(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addContactSubject(); }}
              placeholder="Nouveau sujet (ex : Catéchèse)"
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
            />
            <motion.button onClick={addContactSubject} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
              <Plus size={15} /> Ajouter
            </motion.button>
          </div>
        </div>
      </CollapsibleSection>

      {/* Inscription */}
      <CollapsibleSection icon={UserPlus} title="Inscription" subtitle="Informations demandées à un fidèle lors de la création de son compte">
        <div className="divide-y divide-gray-50 mb-4">
          {regFields.map((f) => (
            <div key={f.id} className="flex items-center justify-between gap-4 py-3">
              <p className={`text-sm font-medium ${f.actif ? "text-gray-800" : "text-gray-400"}`}>{f.label}</p>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2.5 transition-opacity ${!f.actif ? "opacity-40 pointer-events-none" : ""}`}>
                  <span className="text-xs font-medium" style={{ color: f.obligatoire ? "#991B1B" : "#6B7280" }}>
                    {f.obligatoire ? "Obligatoire" : "Optionnel"}
                  </span>
                  <ToggleSwitch on={f.obligatoire} onClick={() => toggleRegFieldObligatoire(f.id)} />
                </div>
                <span className="w-px h-5 bg-gray-200" />
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-medium" style={{ color: f.actif ? "#166534" : "#6B7280" }}>
                    {f.actif ? "Activé" : "Désactivé"}
                  </span>
                  <ToggleSwitch on={f.actif} onClick={() => toggleRegFieldActif(f.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addField(); }}
            placeholder="Nouveau champ (ex : Profession)"
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
          />
          <motion.button onClick={addField} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
            <Plus size={15} /> Ajouter
          </motion.button>
        </div>
      </CollapsibleSection>

      {/* Inscription aux événements */}
      <CollapsibleSection icon={CalendarClock} title="Inscription aux événements" subtitle="Informations demandées à un fidèle lors de son inscription à un événement">
        <div className="divide-y divide-gray-50 mb-4">
          {eventRegFields.map((f) => (
            <div key={f.id} className="flex items-center justify-between gap-4 py-3">
              <p className={`text-sm font-medium ${f.actif ? "text-gray-800" : "text-gray-400"}`}>{f.label}</p>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2.5 transition-opacity ${!f.actif ? "opacity-40 pointer-events-none" : ""}`}>
                  <span className="text-xs font-medium" style={{ color: f.obligatoire ? "#991B1B" : "#6B7280" }}>
                    {f.obligatoire ? "Obligatoire" : "Optionnel"}
                  </span>
                  <ToggleSwitch on={f.obligatoire} onClick={() => toggleEventRegFieldObligatoire(f.id)} />
                </div>
                <span className="w-px h-5 bg-gray-200" />
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-medium" style={{ color: f.actif ? "#166534" : "#6B7280" }}>
                    {f.actif ? "Activé" : "Désactivé"}
                  </span>
                  <ToggleSwitch on={f.actif} onClick={() => toggleEventRegFieldActif(f.id)} />
                </div>
              </div>
            </div>
          ))}
          {eventRegFields.length === 0 && (
            <p className="text-sm text-gray-400 py-3 text-center">Aucun champ défini</p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={newEventRegField}
            onChange={(e) => setNewEventRegField(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addEventRegField(); }}
            placeholder="Nouveau champ (ex : Paroisse d'origine)"
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
          />
          <motion.button onClick={addEventRegField} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
            <Plus size={15} /> Ajouter
          </motion.button>
        </div>
      </CollapsibleSection>

      {/* Connexion */}
      <CollapsibleSection icon={LogIn} title="Connexion" subtitle="Méthodes disponibles pour se connecter à la plateforme">
        <div className="divide-y divide-gray-50">
          {loginOptions.map((o) => (
            <div key={o.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800">{o.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{o.description}</p>
              </div>
              <ToggleSwitch on={o.actif} onClick={() => toggleLoginOption(o.id)} />
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Moyens de paiement */}
      <CollapsibleSection icon={CreditCard} title="Moyens de paiement" subtitle="Activez ou désactivez les moyens de paiement proposés aux fidèles">
        <div className="divide-y divide-gray-50">
          {paymentMethods.map((m) => (
            <div key={m.id} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{m.label}</p>
                  <p className="text-xs text-gray-400">via {m.provider}</p>
                </div>
              </div>
              <ToggleSwitch on={m.actif} onClick={() => togglePaymentMethod(m.id)} />
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Catégories d'affectation des dons */}
      <CollapsibleSection icon={Tag} title="Catégories d'affectation des dons" subtitle="Causes proposées aux fidèles lors d'un don (ex : Construction, Missions…)">
        <div className="divide-y divide-gray-50 mb-4">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <p className="text-sm font-medium text-gray-800 truncate">{c.label}</p>
              </div>
              <button onClick={() => setDeleteCategory(c)} title="Supprimer cette catégorie"
                className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-gray-400 py-3 text-center">Aucune catégorie définie</p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addCategory(); }}
            placeholder="Nouvelle catégorie (ex : Jeunesse)"
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
          />
          <motion.button onClick={addCategory} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
            <Plus size={15} /> Ajouter
          </motion.button>
        </div>
      </CollapsibleSection>

      {/* Page de don */}
      <CollapsibleSection icon={Heart} title="Page de don" subtitle="Configuration du formulaire affiché aux fidèles sur la page « Faire un don »">

        <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-50 mb-1">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
              <EyeOff size={15} style={{ color: "#1A3C6E" }} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800">Don anonyme</p>
              <p className="text-xs text-gray-400 mt-0.5">Afficher le curseur permettant aux donateurs de choisir de faire un don anonyme</p>
            </div>
          </div>
          <ToggleSwitch on={donAnonymousEnabled} onClick={() => setDonAnonymousEnabled((v) => !v)} />
        </div>

        <div className="divide-y divide-gray-50 mb-4">
          {donInfoFields.map((f) => (
            <div key={f.id} className="flex items-center justify-between gap-4 py-3">
              <p className={`text-sm font-medium ${f.actif ? "text-gray-800" : "text-gray-400"}`}>{f.label}</p>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2.5 transition-opacity ${!f.actif ? "opacity-40 pointer-events-none" : ""}`}>
                  <span className="text-xs font-medium" style={{ color: f.obligatoire ? "#991B1B" : "#6B7280" }}>
                    {f.obligatoire ? "Obligatoire" : "Optionnel"}
                  </span>
                  <ToggleSwitch on={f.obligatoire} onClick={() => toggleDonInfoFieldObligatoire(f.id)} />
                </div>
                <span className="w-px h-5 bg-gray-200" />
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-medium" style={{ color: f.actif ? "#166534" : "#6B7280" }}>
                    {f.actif ? "Activé" : "Désactivé"}
                  </span>
                  <ToggleSwitch on={f.actif} onClick={() => toggleDonInfoFieldActif(f.id)} />
                </div>
                <button onClick={() => setDeleteDonInfoField(f)} title="Supprimer ce champ"
                  className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {donInfoFields.length === 0 && (
            <p className="text-sm text-gray-400 py-3 text-center">Aucun champ défini</p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={newDonInfoField}
            onChange={(e) => setNewDonInfoField(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addDonInfoField(); }}
            placeholder="Nouveau champ (ex : Adresse postale)"
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A3C6E]"
          />
          <motion.button onClick={addDonInfoField} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "#1A3C6E" }}>
            <Plus size={15} /> Ajouter
          </motion.button>
        </div>
      </CollapsibleSection>

      {/* ── Modale de confirmation suppression catégorie ── */}
      <AnimatePresence>
        {deleteCategory && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDeleteCategory(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEE2E2" }}>
                <Trash2 size={20} style={{ color: "#991B1B" }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Supprimer cette catégorie ?</h3>
              <p className="text-sm text-gray-500 mb-6">
                La catégorie <span className="font-medium text-gray-700">{deleteCategory.label}</span> ne sera plus proposée aux fidèles lors d'un don. Cette action est irréversible.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteCategory(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={confirmDeleteCategory}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de confirmation suppression champ page de don ── */}
      <AnimatePresence>
        {deleteDonInfoField && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDeleteDonInfoField(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEE2E2" }}>
                <Trash2 size={20} style={{ color: "#991B1B" }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Supprimer ce champ ?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Le champ <span className="font-medium text-gray-700">{deleteDonInfoField.label}</span> ne sera plus demandé aux fidèles sur la page de don. Cette action est irréversible.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteDonInfoField(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={confirmDeleteDonInfoField}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de confirmation suppression champ formulaire de contact ── */}
      <AnimatePresence>
        {deleteContactField && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDeleteContactField(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEE2E2" }}>
                <Trash2 size={20} style={{ color: "#991B1B" }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Supprimer ce champ ?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Le champ <span className="font-medium text-gray-700">{deleteContactField.label}</span> ne sera plus demandé aux visiteurs sur la page de contact. Cette action est irréversible.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteContactField(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={confirmDeleteContactField}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modale de confirmation suppression engagement ── */}
      <AnimatePresence>
        {deleteEngagement && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDeleteEngagement(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEE2E2" }}>
                <Trash2 size={20} style={{ color: "#991B1B" }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Supprimer cet engagement ?</h3>
              <p className="text-sm text-gray-500 mb-6">
                La carte <span className="font-medium text-gray-700">{deleteEngagement.title}</span> ne sera plus affichée sur la page « À propos ». Cette action est irréversible.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteEngagement(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <motion.button
                  onClick={confirmDeleteEngagement}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
