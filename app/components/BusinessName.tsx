type BusinessNameProps = {
  className?: string;
};

export default function BusinessName({ className = "" }: BusinessNameProps) {
  return (
    <span className={className}>
      Dollhouse{" "}
      <span className="text-[0.82em] font-light italic text-accent/90">
        &amp;
      </span>{" "}
      Co.
    </span>
  );
}
