import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import ProfileForm from "../src/app/components/ProfileForm";
import { useRouter } from "next/navigation";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ProfileForm", () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display success message on successful save", async () => {
    (axios.put as jest.Mock).mockResolvedValue({ data: true });

    render(<ProfileForm existingUsername="" />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "newUser" },
    });
    fireEvent.click(screen.getByText(/save/i));

    expect(await screen.findByText(/settings saved!/i)).toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith("/dashboard/class-type");
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("should display error message on failed save", async () => {
    (axios.put as jest.Mock).mockResolvedValue({ data: false });

    render(<ProfileForm existingUsername="" />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "newUser" },
    });
    fireEvent.click(screen.getByText(/save/i));

    expect(await screen.findByText(/there was an error/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("should not redirect if existing username is provided", async () => {
    (axios.put as jest.Mock).mockResolvedValue({ data: true });

    render(<ProfileForm existingUsername="existingUser" />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "newUser" },
    });
    fireEvent.click(screen.getByText(/save/i));

    expect(await screen.findByText(/settings saved!/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });
});
