import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductPage from "@/pages/products/ProductPage";
import IndustryPage from "@/pages/industries/IndustryPage";
import ResourcePage from "@/pages/resources/ResourcePage";
import BlogList from "@/pages/blog/BlogList";
import BlogDetail from "@/pages/blog/BlogDetail";
import { AuthProvider } from "@/admin/lib/AuthContext";
import { RequireAuth } from "@/admin/lib/RequireAuth";
import AdminLogin from "@/admin/pages/Login";
import PageBuilder from "@/admin/pages/PageBuilder";
import PagesList from "@/admin/pages/PagesList";
import NewPage from "@/admin/pages/NewPage";
import BlogPostsList from "@/admin/pages/BlogPostsList";
import BlogPostEditor from "@/admin/pages/BlogPostEditor";
import MenuBuilder from "@/admin/pages/MenuBuilder";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products/:slug" component={ProductPage} />
      <Route path="/industries/:slug" component={IndustryPage} />
      <Route path="/resources/:slug" component={ResourcePage} />
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
            <Router />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
