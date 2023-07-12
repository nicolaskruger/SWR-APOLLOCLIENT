import { HTMLAttributes } from "react";

type PErrorProps = HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
  isError: boolean;
};

const PError = ({ children, isError, ...props }: PErrorProps) => {
  return (
    <p
      data-visibility={isError}
      className="text-red-700 data-[visibility=true]:visible data-[visibility=false]:invisible"
      {...props}
    >
      {children}
    </p>
  );
};

export { PError };
