import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

function Icon({ className, size = 32, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
    >
      {children}
    </svg>
  );
}

// ─── Einzelwaffen-Icons (Unterkategorien) ────────────────────

export function PistolenIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 10h20c1.1 0 2 .9 2 2v3c0 .6-.4 1-1 1h-1v1h1.5c.3 0 .5.2.5.5s-.2.5-.5.5H24v-2H10v2h-1l-2 7c-.2.5-.6.8-1.1.8H4.5c-.8 0-1.3-.8-1-1.5L6 18v-3H5c-.6 0-1-.4-1-1v-3c0-.6.4-1 1-1zm6 5h12v-3H11v3zm-3-3H7v2h1v-2z" />
    </Icon>
  );
}

export function RevolverIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 11h14l4-1h3c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-3l-1 1h-4a4 4 0 01-4 4l-1.5 5.5c-.2.5-.6.8-1.1.8H11c-.8 0-1.3-.8-1-1.5L12 19a4 4 0 01-2-3.5V15H6c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1zm9 4a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    </Icon>
  );
}

export function RepetierIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 13h5l1-2h14l3-1h4c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-4l-1 1H16v2h-2v-2H8l-1 2H5l-1-2H2c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1zm6 1h14v-2H8v2zm14-4h2l1-1v-1h-2l-1 2z" />
    </Icon>
  );
}

export function HalbautomatIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M1 12h3l1-2h3v-1h2v1h12l2-1h5c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-1v1h1.5c.3 0 .5.2.5.5s-.2.5-.5.5H28v-2H10v1h-1v1H8l-1 3.5c-.1.3-.4.5-.7.5H5.5c-.4 0-.7-.3-.6-.7L6 15H4l-1 2H1c-.6 0-1-.4-1-1v-3c0-.6.4-1 1-1zm14 2h12v-2H15v2zm-5-4h2V9h-2v1z" />
    </Icon>
  );
}

export function EinzelladerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 14h5l1-3h14l3-1h4c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-4l-1 1H8l-1 2H5l-1-2H2c-.6 0-1-.4-1-1v0c0-.6.4-1 1-1zm6 0h14v-2H8v2zm7-4l2-2h1l-2 2h-1z" />
    </Icon>
  );
}

export function JagdbuechseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 14h4l2-4c.5-1 1.5-1.5 2.5-1.5h1.5l1-1h2l-1 1H16l2-.5h4l3-1h4c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-4l-2 1h-5l-1 1H8l-1 1.5-1 2c-.3.6-.8 1-1.5 1H3.5c-.8 0-1.3-.8-1-1.5L4 15H2c-.6 0-1-.4-1-1s.4-1 1-1zm6 0h14v-2H8v2zm3.5-1a.5.5 0 110-1 .5.5 0 010 1zm1.5 0a.5.5 0 110-1 .5.5 0 010 1z" />
    </Icon>
  );
}

export function OrdonnanzIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M1 14h6l1-3h14l2-1h5c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-5l-1 1H8l-1 2H5l-1-2H1c-.6 0-1-.4-1-1v0c0-.6.4-1 1-1zm7 0h14v-2H8v2z" />
    </Icon>
  );
}

export function BockflinteIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h5l1-2h14l3-1h4c.6 0 1 .4 1 1v1.5c0 .3-.2.5-.5.5h-.5v1h1c.6 0 1 .4 1 .5v1c0 .6-.4 1-1 1h-4l-3-1H8l-1 2H5l-1-2H2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1zm6 3h14v-1H8v1zm0-2h14v-1H8v1z" />
    </Icon>
  );
}

export function SelbstladeFlinteIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 13h5l1-2h4v-1h2v1h8l3-1h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-2l-1 1H14v1h-2v-1H8l-1 2H5l-1-2H2c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1zm6 1h14v-2H8v2z" />
    </Icon>
  );
}

export function PumpActionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M1 13h6l1-2h14l3-1h4c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-4l-1 1H8l-1 2H5l-1-2H1c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1zm7 1h6v-2H8v2zm7-2v2h7v-2h-7zm-7 5h5v-1H8v1z" />
    </Icon>
  );
}

export function VorderladerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M1 14h4l2-4h13l3-1h6c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-6l-1 1H7l-2 3H3l-1-2H1c-.6 0-1-.4-1-1v0c0-.6.4-1 1-1zm6 0h13v-2H7v2zm3-4l1-2h2l-1 2h-2z" />
    </Icon>
  );
}

export function MesserIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M26.7 3.3c.4.4.4 1 0 1.4L13.4 18H12v1.5c0 .3-.1.5-.3.7l-3 3c-.4.4-1 .4-1.4 0L4.8 20.7c-.4-.4-.4-1 0-1.4l3-3c.2-.2.4-.3.7-.3H10v-1.4L25.3 3.3c.4-.4 1-.4 1.4 0zM10 18l13-13-1-1-13 13v1h1zm-2 1l-2 2 1.5 1.5 2-2V19H8z" />
    </Icon>
  );
}

export function LuftwaffeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 11h16c1.1 0 2 .9 2 2v1h1c.6 0 1 .4 1 1s-.4 1-1 1h-1v1c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-1H3c-.6 0-1-.4-1-1s.4-1 1-1h1v-1c0-1.1.9-2 2-2zm1 2v6h14v-6H7zm-3 2.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
    </Icon>
  );
}

export function SchreckschussIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 12h14c1.1 0 2 .9 2 2v2c0 .6-.4 1-1 1h-1v1h-1v-1H9v1H8v-1H7c-.6 0-1-.4-1-1v-2c0-1.1.9-2 2-2h-2zm2 2v2h12v-2H8zm17-2l2 2-2 2v-4zm-1 0v4l-2-2 2-2z" />
    </Icon>
  );
}

export function OptikIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 14a5 5 0 0110 0 5 5 0 01-10 0zm5-3a3 3 0 100 6 3 3 0 000-6zm6 2h10c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H15v-4zm-1 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM26 12v1h3v-1h-3zm0 5v1h3v-1h-3z" />
    </Icon>
  );
}

export function MunitionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 10c0-1.7 1.3-4 2.5-5 .3-.3.7-.3 1 0C12.7 6 14 8.3 14 10v14c0 .6-.4 1-1 1H9c-.6 0-1-.4-1-1V10zm2 0v13h2V10c0-1-.6-2.2-1-3-.4.8-1 2-1 3zm5-2c0-1.7 1.3-4 2.5-5 .3-.3.7-.3 1 0C19.7 4 21 6.3 21 8v16c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1V8zm2 0v15h2V8c0-1-.6-2.2-1-3-.4.8-1 2-1 3zm5 4c0-1.7 1.3-4 2.5-5 .3-.3.7-.3 1 0C26.7 8 28 10.3 28 12v12c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1V12zm2 0v11h2V12c0-1-.6-2.2-1-3-.4.8-1 2-1 3z" />
    </Icon>
  );
}

export function MagazinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M11 3c.6 0 1 .4 1 1v1h2c.6 0 1 .4 1 1v20c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2V6c0-.6.4-1 1-1h2V4c0-.6.4-1 1-1zm1 4H8v19c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-3c-.6 0-1.7-.2-2-.5-.5-.5-.5-1-.5-1.5v-1c0-.5 0-1 .5-1.5.3-.3 1.4-.5 2-.5V7h-2zm0 5h2v2h-2v-2zm0 6h2v2h-2v-2z" />
    </Icon>
  );
}

export function HolsterIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 3h6c1.1 0 2 .9 2 2v4l2 2v6c0 1.1-.9 2-2 2h-1v8c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1v-8H8c-1.1 0-2-.9-2-2v-6l2-2V5c0-1.1.9-2 2-2zm0 2v4h6V5h-6zm-2 6v4h10v-4l-1-1H9l-1 1zm3 8v6h4v-6h-4z" />
    </Icon>
  );
}

export function WiederladenIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 2c.6 0 1 .4 1 1v3h2c.6 0 1 .4 1 1v2c0 .3-.1.5-.3.7L17 12v4l1.7 2.3c.2.2.3.4.3.7v8c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-8c0-.3.1-.5.3-.7L15 16v-4l-1.7-2.3c-.2-.2-.3-.4-.3-.7V7c0-.6.4-1 1-1h2V3c0-.6.4-1 1-1h-2zm-1 6v2l2 3 2-3V8h-4zm0 11v6h4v-6l-2-3-2 3z" />
    </Icon>
  );
}

export function ReinigungIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 2c.3 0 .5.1.7.3l2 2c.2.2.3.4.3.7v22c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V5c0-.3.1-.5.3-.7l2-2c.2-.2.4-.3.7-.3zm-1 4v21h2V6l-1-1-1 1zm-4 4c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1s-1-.4-1-1v-2c0-.6.4-1 1-1zm0 6c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1s-1-.4-1-1v-2c0-.6.4-1 1-1z" />
    </Icon>
  );
}

export function JagdwaffenIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h5l1-3h14l3-1h4c.6 0 1 .4 1 1v1c0 .3-.2.5-.5.5H30v.5c0 .3-.2.5-.5.5H29v.5c0 .3-.2.5-.5.5H28c-.6 0-1-.4-1-1l-2 1H8l-1 1.5-1 2.5c-.3.5-.8.8-1.3.8H3.5c-.8 0-1.3-.8-1-1.5L4 13H2c-.6 0-1-.4-1-1s.4-1 1-1zm6 1.5h14v-.5H8v.5zm0-1.5h14v-.5H8V12zm0 2h14v-.5H8v.5z" />
    </Icon>
  );
}

export function DrillingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 11h5l1-2h14l3-1h4c.6 0 1 .4 1 1v1.5c0 .3-.2.5-.5.5h-.5v1h.5c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5H29v.5c0 .6-.4 1-1 1h-3l-2 1H8l-1 1.5-1 2c-.3.6-.8 1-1.5 1H3.5c-.8 0-1.3-.8-1-1.5L4 14H2c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1zm6 1h14v-1H8v1zm0 1.5h14v-1H8v1zm0 1.5h14v-.5H8V15z" />
    </Icon>
  );
}

export function BockbuechsflinteIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h5l1-2h14l3-1h4c.6 0 1 .4 1 1v1.5c0 .3-.2.5-.5.5h-.5v1h1c.6 0 1 .3 1 .5v.5c0 .6-.4 1-1 1h-4l-3-1H8l-1 2H5l-1-2H2c-.6 0-1-.4-1-1v-1.5c0-.6.4-1 1-1zm6 2.5h14v-1H8v1zm0-2h14v-.5H8v.5z" />
    </Icon>
  );
}

export function JagdflinteIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h5l1-2h14l3-1h4c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-4l-3 1H8l-1 1.5-1 2c-.3.6-.8 1-1.5 1H3.5c-.8 0-1.3-.8-1-1.5L4 14H2c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1zm6 2h14v-2H8v2z" />
    </Icon>
  );
}

export function JagdzubehoerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 14a4 4 0 018 0 4 4 0 01-8 0zm4-2a2 2 0 100 4 2 2 0 000-4zm5 1h7c.6 0 1 .4 1 1v1c0 .6-.4 1-1 1h-7v-3zm11-5h2v2h2v2h-2v2h-2v-2h-2v-2h2V8zM5 22h6v2H5v-2zm8 0h6v2h-6v-2z" />
    </Icon>
  );
}

// ─── Hauptkategorie-Icons (Gruppen) ──────────────────────────

export function KurzwaffenIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 9h18c1.1 0 2 .9 2 2v3c0 .6-.4 1-1 1h-1v1h1.5c.3 0 .5.2.5.5s-.2.5-.5.5H21v-2H9v2H8l-2 6c-.2.5-.6.8-1.1.8H3.5c-.8 0-1.3-.8-1-1.5L5 17v-3H4c-.6 0-1-.4-1-1v-3c0-.6.4-1 1-1zm5 5h11v-3H9v3zM27 12a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
    </Icon>
  );
}

export function BuechsenIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 13h5l1-2h14l3-1h4c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-4l-1 1H16v2h-2v-2H8l-1 2H5l-1-2H2c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1zm6 1h14v-2H8v2zM20 8a3 3 0 016 0v1h-2V8a1 1 0 10-2 0v1h-2V8z" />
    </Icon>
  );
}

export function FlintenGruppeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h5l1-2h14l3-1h4c.6 0 1 .4 1 1v1.5c0 .3-.2.5-.5.5h-.5v1h1c.6 0 1 .4 1 .5v1c0 .6-.4 1-1 1h-4l-3-1H8l-1 2H5l-1-2H2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1zm6 3h14v-1H8v1zm0-2h14v-1H8v1z" />
    </Icon>
  );
}

export function SammlerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M1 14h4l2-4h13l3-1h6c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-6l-1 1H7l-2 3H3l-1-2H1c-.6 0-1-.4-1-1v0c0-.6.4-1 1-1zm6 0h13v-2H7v2zM24 4h2v2h2v2h-2v2h-2V8h-2V6h2V4z" />
    </Icon>
  );
}

export function FreieWaffenIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 11h16c1.1 0 2 .9 2 2v1h1c.6 0 1 .4 1 1s-.4 1-1 1h-1v1c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-1H3c-.6 0-1-.4-1-1s.4-1 1-1h1v-1c0-1.1.9-2 2-2zm1 2v6h14v-6H7zm-3 2.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
    </Icon>
  );
}

// ─── Optik Unterkategorie-Icons ──────────────────────────────

export function ZielfernrohrIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 14a5 5 0 0110 0 5 5 0 01-10 0zm5-3a3 3 0 100 6 3 3 0 000-6zm7 2h10c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H15v-4zm-1 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM26 12v1h3v-1h-3zm0 5v1h3v-1h-3zm-9-6h2v2h-2V11zm0 7h2v2h-2v-2z" />
    </Icon>
  );
}

export function RotpunktIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 12h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2zm0 2v4h16v-4H6zm8 .5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 10l2-2h4l2 2H10z" />
    </Icon>
  );
}

export function NachtsichtIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 8h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2zm0 2v12h16V10H8zm4 2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 110 4 2 2 0 010-4zm0 1a1 1 0 100 2 1 1 0 000-2z" />
    </Icon>
  );
}

export function FernglasIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 8c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3s-3-1.3-3-3V11c0-1.7 1.3-3 3-3zm0 2a1 1 0 00-1 1v10a1 1 0 002 0V11a1 1 0 00-1-1zm18-2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3s-3-1.3-3-3V11c0-1.7 1.3-3 3-3zm0 2a1 1 0 00-1 1v10a1 1 0 002 0V11a1 1 0 00-1-1zm-13 4h8v2h-8v-2z" />
    </Icon>
  );
}

export function MontageIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h24v2H4v-2zm4 4h4v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4zm12 0h4v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4zM10 8h4v4h-4V8zm8 0h4v4h-4V8z" />
    </Icon>
  );
}

export function OptikZubehoerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 14a4 4 0 018 0 4 4 0 01-8 0zm4-2a2 2 0 100 4 2 2 0 000-4zm6 1h6c.6 0 1 .4 1 1v1c0 .6-.4 1-1 1h-6v-3zm10-2c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1s-1-.4-1-1v-4c0-.6.4-1 1-1zm4 1h2v2h-2v-2z" />
    </Icon>
  );
}

// ─── Munition Unterkategorie-Icons ───────────────────────────

export function BuechsenmunitionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 6c0-1.7 1.3-4 2.5-5 .3-.3.7-.3 1 0C18.7 2 20 4.3 20 6v20c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1V6zm2 0v19h2V6c0-1-.6-2.2-1-3-.4.8-1 2-1 3z" />
    </Icon>
  );
}

export function PistolenmunitionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 10c0-1.1.6-2.5 1.5-3.5.3-.3.7-.3 1 0 .9 1 1.5 2.4 1.5 3.5v14c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V10zm1 0v13h2V10c0-.5-.3-1.2-.5-1.7h-1c-.2.5-.5 1.2-.5 1.7zm6-2c0-1.1.6-2.5 1.5-3.5.3-.3.7-.3 1 0 .9 1 1.5 2.4 1.5 3.5v16c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V8zm1 0v15h2V8c0-.5-.3-1.2-.5-1.7h-1c-.2.5-.5 1.2-.5 1.7z" />
    </Icon>
  );
}

export function SchrotmunitionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13 8h6c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1zm1 2v14h4V10h-4zm.5 2a.5.5 0 110 1 .5.5 0 010-1zm1.5.5a.5.5 0 110 1 .5.5 0 010-1zm1.5-.5a.5.5 0 110 1 .5.5 0 010-1zm-2.5 2a.5.5 0 110 1 .5.5 0 010-1zm2 0a.5.5 0 110 1 .5.5 0 010-1zM16 4l1-2h-2l1 2z" />
    </Icon>
  );
}

export function RandfeuermunitionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 12c0-1 .5-2 1.2-2.8.2-.2.5-.2.6 0 .7.8 1.2 1.8 1.2 2.8v12c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V12zm1 0v11h1V12h-1zm5-2c0-1 .5-2 1.2-2.8.2-.2.5-.2.6 0 .7.8 1.2 1.8 1.2 2.8v14c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V10zm1 0v13h1V10h-1z" />
    </Icon>
  );
}

export function WiederladenMunitionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 2c.6 0 1 .4 1 1v3h2c.6 0 1 .4 1 1v2c0 .3-.1.5-.3.7L17 12v4l1.7 2.3c.2.2.3.4.3.7v8c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-8c0-.3.1-.5.3-.7L15 16v-4l-1.7-2.3c-.2-.2-.3-.4-.3-.7V7c0-.6.4-1 1-1h2V3c0-.6.4-1 1-1h-2zm-1 6v2l2 3 2-3V8h-4zm0 11v6h4v-6l-2-3-2 3z" />
    </Icon>
  );
}

// ─── Zubehör-Gruppe ──────────────────────────────────────────

export function ZubehoerGruppeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 14a4 4 0 018 0 4 4 0 01-8 0zm4-2a2 2 0 100 4 2 2 0 000-4zm5 1h8c.6 0 1 .4 1 1v1c0 .6-.4 1-1 1h-8v-3zm10-4h2v2h2v2h-2v2h-2v-2h-2v-2h2V9zM11 22h4v2h2v2H9v-2h2v-2z" />
    </Icon>
  );
}
