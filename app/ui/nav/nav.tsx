'use client';
import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '@/app/lib/actions';
import React, { useState } from 'react';
import Burger from '@/app/ui/nav/burger'

export default function Nav () {
  return( 
    <div>
      <Burger />
      <form action={async () => { await logout();}}>
        <button className="p-3 hover:text-red-600">
          <PowerIcon className="w-6" />
        </button>
      </form>
    </div>
  );
};
