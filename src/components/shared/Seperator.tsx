'use client';

export default function Seperator({ my = 6 }: { my?: number }) {
  return (
    <div
      style={{
        marginTop: my,
        marginBottom: my,
      }}
    ></div>
  );
}
