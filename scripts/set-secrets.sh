secrets_file="$1"

if [ -z "$secrets_file" ]; then
    cat <<EOF
Usage: $0 SECRETS_FILE

SECRETS_FILE contains a list of sourceable bash variables, for example:
\`\`\`
secret0=secret
secret1=foobar
\`\`\`

EOF
    exit 1
fi

. $(realpath "$secrets_file")

(cat "$secrets_file" | cut -d'=' -f1; echo) | \
    while read -r secret_name; do
        if [ -n "$secret_name" ]; then
            echo "${!secret_name}" | wrangler secret put "${secret_name}"
        fi
    done
