export function formatPrice(priceObject) {
    if (!priceObject) return 'Free';

    let amount = priceObject.amount;
    let currency = priceObject.currency;

    if (priceObject.number !== undefined) {
        amount = priceObject.number;
        currency = priceObject.currency?.currencyCode || priceObject.currency || "USD";
    }

    if (amount === undefined || amount === null) return 'Free';

    try {
        return new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: currency || 'USD',
        }).format(amount);
    } catch (e) {
        return `${amount} ${currency}`;
    }
}