import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function DELETE(request) {
  if (!supabaseUrl || !supabasePublishableKey || !serviceRoleKey) {
    return Response.json(
      {
        error: "Account deletion is not configured yet. Add SUPABASE_SERVICE_ROLE_KEY on the server."
      },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!accessToken) {
    return Response.json({ error: "Missing access token." }, { status: 401 });
  }

  const userClient = createClient(supabaseUrl, supabasePublishableKey);
  const {
    data: { user },
    error: userError
  } = await userClient.auth.getUser(accessToken);

  if (userError || !user) {
    return Response.json({ error: "Unable to verify user session." }, { status: 401 });
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id);

  if (deleteError) {
    return Response.json({ error: deleteError.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
