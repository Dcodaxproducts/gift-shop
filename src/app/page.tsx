const featuredProducts = [
  {
    name: "Birthday Gift Box",
    price: "$49",
    description: "A cheerful bundle with treats, candles, and a handwritten card.",
  },
  {
    name: "Luxury Flowers",
    price: "$79",
    description: "Fresh seasonal blooms arranged for anniversaries and special days.",
  },
  {
    name: "Custom Hamper",
    price: "$99",
    description: "Personalized premium picks packed beautifully for every occasion.",
  },
];

const benefits = ["Same-day delivery", "Custom notes", "Premium packaging"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff8f2] text-[#2d2118]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-8 md:px-10 lg:px-12">
        <header className="flex items-center justify-between rounded-full border border-[#efd8c5] bg-white/75 px-5 py-4 shadow-sm backdrop-blur">
          <span className="text-lg font-bold tracking-tight">Gift Shop</span>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#6d5543] sm:flex">
            <a href="#products" className="transition hover:text-[#2d2118]">
              Products
            </a>
            <a href="#delivery" className="transition hover:text-[#2d2118]">
              Delivery
            </a>
            <a href="#contact" className="transition hover:text-[#2d2118]">
              Contact
            </a>
          </nav>
        </header>

        <section className="grid items-center gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-[#ffe3cc] px-4 py-2 text-sm font-semibold text-[#9a4f1b]">
              Thoughtful gifts for every moment
            </div>
            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-black tracking-tight md:text-7xl">
                Send love with beautifully packed gifts.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#6d5543]">
                Discover curated gift boxes, flowers, hampers, and custom
                surprises made to feel personal, premium, and unforgettable.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#products"
                className="rounded-full bg-[#2d2118] px-7 py-4 text-center text-sm font-bold text-white shadow-lg shadow-[#2d2118]/20 transition hover:-translate-y-0.5 hover:bg-[#493423]"
              >
                Shop gifts
              </a>
              <a
                href="#contact"
                className="rounded-full border border-[#d9bda4] bg-white px-7 py-4 text-center text-sm font-bold text-[#2d2118] transition hover:-translate-y-0.5 hover:border-[#2d2118]"
              >
                Create custom order
              </a>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-[#f4c7a2] p-6 shadow-2xl shadow-[#d8a075]/30">
            <div className="rounded-[2rem] bg-white p-6">
              <div className="flex aspect-square items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#fff0df] via-[#ffd0d7] to-[#f5b66b] text-8xl">
                🎁
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#b36b32]">
                  Best seller
                </p>
                <h2 className="text-2xl font-bold">Signature Gift Hamper</h2>
                <p className="text-[#6d5543]">
                  Premium sweets, flowers, candles, and a custom card.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="delivery" className="grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit} className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-lg font-bold">{benefit}</p>
              <p className="mt-2 text-sm leading-6 text-[#6d5543]">
                Built into every order so customers get a smooth gifting
                experience from cart to delivery.
              </p>
            </div>
          ))}
        </section>

        <section id="products" className="space-y-8 py-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b36b32]">
              Featured products
            </p>
            <h2 className="text-3xl font-black md:text-5xl">
              Ready-to-send favorites
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.name}
                className="rounded-[2rem] border border-[#efd8c5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-32 items-center justify-center rounded-3xl bg-[#fff0df] text-5xl">
                  🎀
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <span className="rounded-full bg-[#2d2118] px-3 py-1 text-sm font-bold text-white">
                    {product.price}
                  </span>
                </div>
                <p className="mt-3 leading-7 text-[#6d5543]">
                  {product.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mb-10 rounded-[2.5rem] bg-[#2d2118] p-8 text-white md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f4c7a2]">
                Need something special?
              </p>
              <h2 className="text-3xl font-black md:text-5xl">
                Build a custom gift order today.
              </h2>
              <p className="max-w-2xl leading-7 text-white/75">
                Tell us the occasion, budget, and recipient style. We will help
                create a memorable gift package.
              </p>
            </div>
            <a
              href="mailto:orders@giftshop.com"
              className="rounded-full bg-white px-7 py-4 text-center text-sm font-bold text-[#2d2118] transition hover:-translate-y-0.5 hover:bg-[#fff0df]"
            >
              Contact sales
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
