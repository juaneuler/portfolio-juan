import { render, screen, act } from "@testing-library/react";
import Home from "./Home";
import { describe, it, expect, vi } from "vitest";
import { LoaderProvider } from "../context/LoaderContext";

const customRender = (ui) => {
  return render(<LoaderProvider>{ui}</LoaderProvider>);
};

vi.mock("../context/LoaderContext", () => ({
  useLoader: () => ({
    hideLoader: vi.fn(),
  }),
  LoaderProvider: ({ children }) => <div>{children}</div>,
}));

vi.mock("../context/LanguageContext", () => ({
  useLanguage: () => ({ language: "es" }),
}));

vi.mock("../components/Portada", () => ({
  default: () => <div data-testid="portada" />,
}));
vi.mock("../components/SobreMi", () => ({
  default: () => <div data-testid="sobre-mi" />,
}));
vi.mock("../components/Tecnologias", () => ({
  default: () => <div data-testid="tecnologias" />,
}));
vi.mock("../components/Educacion", () => ({
  default: () => <div data-testid="educacion" />,
}));
vi.mock("../components/FadeInSection", () => ({
  default: ({ children }) => <div data-testid="fade-in">{children}</div>,
}));

describe("Home", () => {
  it("renderiza los componentes principales después del loader", async () => {
    vi.useFakeTimers();

    customRender(<Home />);

    expect(screen.queryByTestId("portada")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByTestId("portada")).toBeInTheDocument();
    expect(screen.getByTestId("sobre-mi")).toBeInTheDocument();
    expect(screen.getByTestId("tecnologias")).toBeInTheDocument();
    expect(screen.getByTestId("educacion")).toBeInTheDocument();

    expect(screen.getAllByTestId("fade-in").length).toBe(3);

    vi.useRealTimers();
  });
});
