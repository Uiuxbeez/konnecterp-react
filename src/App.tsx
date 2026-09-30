import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StickyWhatsapp } from "@/components/site/StickyWhatsapp";
const NotFound = lazy(() => import("@/pages/not-found"));
import Home from "@/pages/Home";
const ProductPage = lazy(() => import("@/pages/products/ProductPage"));
const IndustryPage = lazy(() => import("@/pages/industries/IndustryPage"));
const ResourcePage = lazy(() => import("@/pages/resources/ResourcePage"));
const StandardPage = lazy(() => import("@/pages/StandardPage"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const Career = lazy(() => import("@/pages/Career"));
const PublicFormPage = lazy(() => import("@/pages/PublicFormPage"));
const BlogList = lazy(() => import("@/pages/blog/BlogList"));
const BlogDetail = lazy(() => import("@/pages/blog/BlogDetail"));
import { AuthProvider } from "@/admin/lib/AuthContext";
import { RequireAuth } from "@/admin/lib/RequireAuth";
const AdminLogin = lazy(() => import("@/admin/pages/Login"));
const PageBuilder = lazy(() => import("@/admin/pages/PageBuilder"));
const PagesList = lazy(() => import("@/admin/pages/PagesList"));
const NewPage = lazy(() => import("@/admin/pages/NewPage"));
const BlogPostsList = lazy(() => import("@/admin/pages/BlogPostsList"));
const BlogPostEditor = lazy(() => import("@/admin/pages/BlogPostEditor"));
const MenuBuilder = lazy(() => import("@/admin/pages/MenuBuilder"));
const FormsBuilder = lazy(() => import("@/admin/pages/FormsBuilder"));
const LeadsList = lazy(() => import("@/admin/pages/LeadsList"));
const SettingsPage = lazy(() => import("@/admin/pages/SettingsPage"));
import { GoogleAnalytics } from "@/components/site/GoogleAnalytics";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products/:slug" component={ProductPage} />
      <Route path="/industries/:slug" component={IndustryPage} />
      <Route path="/resources/:slug" component={ResourcePage} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/career" component={Career} />
      <Route path="/forms/:slug" component={PublicFormPage} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/blog/new">
        <RequireAuth>
          <BlogPostEditor />
        </RequireAuth>
      </Route>
      <Route path="/admin/blog/:id/edit">
        <RequireAuth>
          <BlogPostEditor />
        </RequireAuth>
      </Route>
      <Route path="/admin/blog">
        <RequireAuth>
          <BlogPostsList />
        </RequireAuth>
      </Route>
      <Route path="/admin/forms">
        <RequireAuth>
          <FormsBuilder />
        </RequireAuth>
      </Route>
      <Route path="/admin/leads">
        <RequireAuth>
          <LeadsList />
        </RequireAuth>
      </Route>
      <Route path="/admin/pages/new">
        <RequireAuth>
          <NewPage />
        </RequireAuth>
      </Route>
      <Route path="/admin/pages">
        <RequireAuth>
          <PagesList />
        </RequireAuth>
      </Route>
      <Route path="/admin/menus">
        <RequireAuth>
          <MenuBuilder />
        </RequireAuth>
      </Route>
      <Route path="/admin/settings">
        <RequireAuth>
          <SettingsPage />
        </RequireAuth>
      </Route>
      <Route path="/admin/page-builder">
        <RequireAuth>
          <PageBuilder />
        </RequireAuth>
      </Route>
      <Route path="/admin">
        <RequireAuth>
          <PageBuilder />
        </RequireAuth>
      </Route>
      <Route path="/:slug" component={StandardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Suspense fallback={<div role="status" className="min-h-screen flex items-center justify-center">Loading page...</div>}>
              <Router />
            </Suspense>
            <GoogleAnalytics />
            <StickyWhatsapp />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
