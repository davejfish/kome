
export async function protectPage(user) {
    if (!user) {
        location.replace(getAuthRedirect());
    }
}

export function getAuthRedirect() {
    const redirectUrl = encodeURIComponent(location.href);
    return `/auth/?redirectUrl=${redirectUrl.toString()}`;
}

export function findByID(list, id) {
    for (const item of list) {
        if (item.id === id) return item;
    }
    return null;
}