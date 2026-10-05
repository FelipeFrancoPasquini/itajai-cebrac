import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  GraduationCap, MessageCircle, Wrench, Briefcase, Award, Rocket, Clock, ArrowRight,
  Monitor, Zap, BarChart3, Palette, Calculator, HeartPulse, Mail, Phone, MapPin,
  Instagram, Facebook, Youtube, Linkedin, CheckCircle2, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CEBRAC | Cursos Profissionalizantes com Certificado" },
      { name: "description", content: "Cursos práticos, certificados reconhecidos e foco total no mercado de trabalho. Garanta 20% de desconto na primeira mensalidade." },
      { property: "og:title", content: "CEBRAC | Domine uma Nova Profissão" },
      { property: "og:description", content: "Cursos profissionalizantes práticos com certificado válido. Matrículas abertas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/5511999999999";

const advantages = [
  { icon: Wrench, title: "Aulas 100% Práticas", text: "Laboratórios equipados para você aprender fazendo desde o primeiro dia." },
  { icon: Briefcase, title: "Professores Atuantes no Mercado", text: "Aprenda com quem vive a profissão e conhece o que as empresas buscam." },
  { icon: Award, title: "Certificado Válido", text: "Certificação reconhecida para fortalecer seu currículo." },
  { icon: Rocket, title: "Apoio de Carreira", text: "Orientação de currículo, entrevistas e encaminhamento a vagas." },
];

const courses = [
  { icon: Monitor, title: "Manutenção de Computadores", hours: "120 horas" },
  { icon: Zap, title: "Eletricista Instalador", hours: "160 horas" },
  { icon: BarChart3, title: "Administração", hours: "140 horas" },
  { icon: Palette, title: "Design Gráfico", hours: "100 horas" },
  { icon: Calculator, title: "Assistente Contábil", hours: "90 horas" },
  { icon: HeartPulse, title: "Cuidador de Idosos", hours: "80 horas" },
];

const testimonials = [
  { name: "Juliana S.", role: "Assistente Administrativa", text: "Em 3 meses de curso já consegui meu primeiro emprego com carteira assinada." },
  { name: "Ricardo M.", role: "Eletricista autônomo", text: "As aulas práticas fizeram toda a diferença. Hoje tenho meus próprios clientes." },
  { name: "Ana P.", role: "Designer Freelancer", text: "Professores incríveis e um certificado que abriu muitas portas." },
];

const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  phone: z.string().trim().regex(/^[\d\s()+-]{10,20}$/, "WhatsApp inválido"),
  course: z.string().min(1, "Escolha um curso"),
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-success text-success-foreground">
        <GraduationCap className="h-5 w-5" />
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${light ? "text-primary-foreground" : "text-primary"}`}>CEBRAC</span>
    </a>
  );
}

function Index() {
  useReveal();
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; course?: string }>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const r = leadSchema.safeParse({ name: fd.get("name"), phone: fd.get("phone"), course });
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs as { name?: string; phone?: string; course?: string });
      return;
    }
    setErrors({});
    toast.success("Desconto garantido!", { description: `${r.data.name.split(" ")[0]}, entraremos em contato pelo WhatsApp em breve.` });
    e.currentTarget.reset();
    setCourse("");
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Logo />
          <nav className="hidden gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#cursos" className="hover:text-primary">Cursos</a>
            <a href="#vantagens" className="hover:text-primary">Vantagens</a>
            <a href="#depoimentos" className="hover:text-primary">Depoimentos</a>
          </nav>
          <Button asChild variant="cta" size="sm" className="shrink-0">
            <a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle /> <span className="hidden sm:inline">Fale no</span> WhatsApp</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-24">
          <div className="reveal">
            <Badge className="mb-5 bg-accent text-accent-foreground hover:bg-accent">
              <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-success" /> Matrículas abertas — vagas limitadas
            </Badge>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Domine uma Nova Profissão e <span className="text-success">Transforme Seu Futuro</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Cursos práticos, certificados reconhecidos e foco total no mercado de trabalho.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="cta" size="lg" className="h-13 text-base">
                <a href="#cursos">Ver Cursos Disponíveis <ArrowRight /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-13 border-primary/20 text-base text-primary">
                <a href="#desconto">Quero 20% de desconto</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["+30 anos de tradição", "+500 mil alunos formados", "Certificado reconhecido"].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" />{t}</span>
              ))}
            </div>
          </div>
          <div className="reveal relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 rotate-2" />
            <img src={hero} width={1280} height={960} alt="Alunos em aula prática no laboratório" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl bg-card p-3 pr-5 shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground"><Award className="h-5 w-5" /></span>
              <div><p className="text-sm font-bold text-primary">92% empregados</p><p className="text-xs text-muted-foreground">em até 6 meses</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section id="vantagens" className="scroll-mt-16 bg-card py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-success">Por que nos escolher</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">Aprenda de verdade. Conquiste de verdade.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="reveal rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:shadow-card" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-5 text-lg font-bold text-primary">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section id="cursos" className="scroll-mt-16 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="reveal flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-success">Catálogo</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">Cursos com matrículas abertas</h2>
            </div>
            <p className="max-w-sm text-muted-foreground">Escolha sua área e comece já na próxima turma.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map(({ icon: Icon, title, hours }, i) => (
              <article key={title} className="reveal flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-6 w-6" /></span>
                  <Badge className="bg-accent text-accent-foreground hover:bg-accent">Matrículas Abertas</Badge>
                </div>
                <h3 className="mt-5 text-xl font-bold text-primary">{title}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> Carga horária: {hours}</p>
                <Button asChild variant="outline" className="mt-6 h-11 w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                  <a href="#desconto">Saber Mais <ArrowRight /></a>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="scroll-mt-16 bg-card py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="reveal text-center text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">Quem estudou, recomenda</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="reveal rounded-2xl border border-border bg-background p-6">
                <div className="flex gap-0.5 text-success">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-4 text-foreground">“{t.text}”</blockquote>
                <figcaption className="mt-5 text-sm"><span className="font-bold text-primary">{t.name}</span><span className="text-muted-foreground"> · {t.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Lead */}
      <section id="desconto" className="scroll-mt-16 bg-primary py-16 text-primary-foreground md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div className="reveal">
            <Badge className="bg-success text-success-foreground hover:bg-success">Oferta por tempo limitado</Badge>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">Garanta <span className="text-success">20% de desconto</span> na primeira mensalidade</h2>
            <p className="mt-4 text-primary-foreground/75">Preencha seus dados e um consultor vai te chamar no WhatsApp com todos os detalhes.</p>
          </div>
          <form onSubmit={onSubmit} noValidate className="reveal space-y-4 rounded-2xl bg-card p-6 text-card-foreground shadow-card sm:p-8">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" placeholder="Seu nome completo" maxLength={100} className="h-12 text-base" />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp</Label>
              <Input id="phone" name="phone" type="tel" inputMode="tel" placeholder="(11) 99999-9999" maxLength={20} className="h-12 text-base" />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label>Curso de interesse</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Selecione um curso" /></SelectTrigger>
                <SelectContent>{courses.map((c) => <SelectItem key={c.title} value={c.title}>{c.title}</SelectItem>)}</SelectContent>
              </Select>
              {errors.course && <p className="text-sm text-destructive">{errors.course}</p>}
            </div>
            <Button type="submit" variant="cta" size="lg" className="h-13 w-full text-base">Garantir Meu Desconto</Button>
            <p className="text-center text-xs text-muted-foreground">Seus dados estão seguros. Não enviamos spam.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep py-14 text-primary-foreground/75">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-4 text-sm">Formando profissionais para o mercado de trabalho há mais de 30 anos.</p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Youtube, Linkedin].map((I, i) => (
                <a key={i} href="#" aria-label="Rede social" className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-success hover:text-success-foreground"><I className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground">Links úteis</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#cursos" className="hover:text-success">Cursos</a></li>
              <li><a href="#vantagens" className="hover:text-success">Vantagens</a></li>
              <li><a href="#depoimentos" className="hover:text-success">Depoimentos</a></li>
              <li><a href="#desconto" className="hover:text-success">Matrícula</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground">Contato</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> contato@cebrac.com.br</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> (11) 3333-4444</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground">Endereço</h4>
            <p className="mt-4 flex gap-2 text-sm"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Av. Paulista, 1000 — Bela Vista, São Paulo - SP, 01310-100</p>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-6xl border-t border-primary-foreground/10 px-4 pt-6 text-center text-xs">© {new Date().getFullYear()} CEBRAC. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
