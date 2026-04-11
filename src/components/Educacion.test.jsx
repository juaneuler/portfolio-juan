import { render, screen } from "@testing-library/react";
import Educacion from "./Educacion";
import { describe, it, expect, vi } from "vitest";

vi.mock("../context/LanguageContext", () => ({
  useLanguage: () => ({ language: "es" }),
}));

vi.mock("../data/educacion", () => ({
  educacion: [
    {
      id: "wordpress",
      nota: 9,
      certificado: "/certificado-wordpress.pdf",
    },
    {
      id: "google-analytics",
      certificado: "https://skillshop.credential.net/prueba",
    },
  ],
}));

describe("Educacion", () => {
  it("renderiza correctamente cursos con temario y certificaciones sin nota", () => {
    render(<Educacion />);

    expect(
      screen.getByRole("heading", { name: /educación/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /curso de wordpress/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/nota final: 9/i)).toBeInTheDocument();
    expect(screen.getByText(/temario:/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /certificación de google analytics/i,
      }),
    ).toBeInTheDocument();

    const notaAnalytics = screen.queryByText(/nota final:/i, {
      selector: ".educacionCarta:nth-child(2) p",
    });
    expect(notaAnalytics).not.toBeInTheDocument();

    const temarioAnalytics = screen.queryByText(/temario:/i, {
      selector: ".educacionCarta:nth-child(2) p",
    });
    expect(temarioAnalytics).not.toBeInTheDocument();

    const links = screen.getAllByRole("link", { name: /ver certificado/i });
    expect(links[0]).toHaveAttribute("href", "/certificado-wordpress.pdf");
    expect(links[1]).toHaveAttribute(
      "href",
      "https://skillshop.credential.net/prueba",
    );
  });
});
