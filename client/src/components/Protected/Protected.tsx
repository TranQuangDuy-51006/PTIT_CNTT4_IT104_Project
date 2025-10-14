import React, { useEffect, type ReactNode } from "react";
import { getStorage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Protect {
  children: ReactNode;
  role?: string;
}

export default function Protected(props: Protect) {
  const navigate = useNavigate();

  useEffect(() => {
    const data = getStorage("user");

    if (!data) {
      toast.warning("Please log in");
      navigate("/login");
    }
  }, []);
  return <div>{props.children}</div>;
}
