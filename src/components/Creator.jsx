// Creator component - contains information about a creator

import { supabase } from '../client';

export default function Creator({ creator }) {
    return (
        <div>
            <h1>{creator.name}</h1>
        </div>
    )
}