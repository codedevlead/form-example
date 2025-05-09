import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'origin': 'http://localhost', // Puedes poner tu dominio aquí
    },
    body: JSON.stringify({
      service_id: 'service_9fofagk',
      template_id: 'template_fvbtsid',
      user_id: 'klrp7uxlGP3VxhjtS',
      template_params: {
        name: 'Juan',
        lastname: 'Pérez'
      }
    }),
  });

  console.log(11111111111111111111, res)
  return NextResponse.json({ success: true, message: 'Correo enviado' });
}