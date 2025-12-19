# MUATPARTS SELLER APPLICATION GUIDE

Halo ges, jadi ini dokumentasi tentang aplikasi Muatparts Buyer. Tolong diperhatikan dengan seksama yaa..
Ini setelah perubahan dari git submodule ke git subtree

## Cara Initiate Project

git clone dan pull seperti biasa sudah works ya gaes, ga perlu command ribet lagi.

## Commands

```bash
git subtree add --prefix=packages https://github.com/programmerazlogistik/muatmuat-packages.git packages-root --squash
```

dipake untuk init sebuah subtree baru, kalian gaperlu melakukan ini harusnya

```bash
git subtree pull --prefix=packages https://github.com/programmerazlogistik/muatmuat-packages.git packages-root --squash
```

dipake untuk pull branch packages-root terbaru, kalian juga bisa pake short command dibawah

```bash
npm run pull:packages
```

### Development

**1. Run dev all project**

```bash
npm run dev
```

### Build

**1. Build project**

```bash
npm run build
```

### Deployment

Untuk update ke gogs, bisa run command dibawah untuk compress file yang perlu-perlu saja.

```bash
npm run zip
```
