# CloudInvoice - Cloud Computing Proiect

**Student:** Stan Alisia-Cristiana
**Grupa:** 1147

---

# Link prezentare video

https://drive.google.com/file/d/1y-EH952zAmXQRFWhZ3H8vOlKfQKD9Xu3/view?usp=drive_link

---

# Link aplicație publicată

https://cloud-invoice-4nr9bchiy-alisia13s-projects.vercel.app

---

# 1. Introducere

Aplicația web *CloudInvoice* este folosită pentru gestionarea clienților, produselor și facturilor într-un mediu cloud. Aceasta le permite utilizatorilor să își creeze conturi, iar apoi să se autentifice și să vizualizeze sau să administreze informațiile necesare pentru emiterea facturilor. 

Aplicația include două tipuri de utilizatori:
- administrator, care are drept de vizualizare, adăugare, editare și ștergere;
- utilizator standard, care are doar dreptul de vizualizare a datelor.

Pentru dezvoltarea aplicației au fost utilizate următoarele tehnologii:
- Next.js - framework utilizat pentru frontend și backend API;
- React - utilizat pentru interfața aplicației;
- MongoDB Atlas - baza de date cloud pentru stocarea informațiilor despre utilizatori, clienți, produse și facturi;
- SendGrid - serviciu cloud utilizat pentru trimiterea automată a unui email către administrator atunci când este creată o factură nouă;
- JWT Authentication - utilizat pentru autentificare și menținerea sesiunii utilizatorului;
- Tailwind CSS - utilizat pentru design-ul și stilizarea aplicației;
- Vercel - platforma utilizată pentru deploy și găzduirea aplicației;
- GitHub - utilizat pentru versionarea și gestionarea codului sursă.

---

# 2. Descriere problemă

Aplicația *CloudInvoice* oferă o soluție centralizată pentru administrarea datelor despre clienți, produse și facturi într-un mediu cloud.

Aplicația implementează operații de tip CRUD (Create, Read, Update, Delete) pentru gestionarea clienților și produselor prin intermediul unui API REST.

În cadrul acestei aplicații se poate realiza autentificarea utilizatorilor, gestionarea clienților și a produselor, crearea facturilor, calcularea automată a totalului unei facturi în funcție de produsele alese și cantitate, precum și trimiterea automată a unei notificări prin email atunci când este creată o nouă factură.

Aplicația funcționează ca o platformă internă pentru o firmă.

---

# 3. Descriere API

Aplicația utilizează un API REST realizat cu Next.js Route Handlers. API-ul permite realizarea operațiilor CRUD asupra resurselor din baza de date.

În ceea ce privește serviciile cloud utilizate, acestea sunt:
- **MongoDB Atlas**, folosit pentru stocarea datelor;
- **SendGrid**, serviciu cloud folosit pentru trimiterea automată a emailurilor la crearea unei facturi.

---

# 4. Flux de date

În cazul **fluxului de autentificare**, utilizatorul introduce emailul și parola. Datele sunt trimise către /api/auth/login, iar serverul verifică utilizatorul în MongoDB Atlas. Dacă autentificarea este validă, se generează un token JWT, care este salvat într-un cookie HTTP-only. Utilizatorul rămâne autentificat și după refresh-ul paginii. În funcție de rolul utilizatorului, sunt afișate funcționalitățile disponibile.

Pentru **fluxul de creare factură**, administratorul completează formularul de creare factură. Datele sunt trimise prin request POST către /api/facturi. Serverul calculează automat totalul facturii, iar aceasta este salvată în MongoDB Atlas. Aplicația trimite automat un email cu SendGrid.

# 4.1 Exemple request/response

Pentru testarea API-urilor am folosit aplicația Postman.

**Autentificare utilizator**
![login](screenshots/postman-login.png)

**Returnarea tuturor clienților**
![get_clienti](screenshots/postman-get-clienti.png)

**Returnarea unui client după id**
![get_client_id](screenshots/postman-get-client-id.png)

**Actualizare client**
![edit_client](screenshots/postman-update-client.png)

**Ștergerea unui client**
![delete_client](screenshots/postman-delete-client.png)

La fel este și pentru produse, aceeași logică.

**Crearea unei facturi**
![add_factura1](screenshots/postman-create-factura-1.png)
![add_factura2](screenshots/postman-create-factura-2.png)


# 4.2 Metode HTTP

Aplicația folosește următoarele metode HTTP:
| Metodă | Rol |
|---|---|
| GET | Returnarea datelor din baza de date |
| POST | Crearea unor înregistrări noi |
| PUT | Actualizarea unor înregistrări existente |
| DELETE | Ștergerea unor înregistrări existente |

Câteva exemple de utilizare:
- `GET /api/clienti` - returnează lista de clienți;
- `POST /api/clienti` - creează un client nou;
- `PUT /api/clienti/[id]` - actualizează un client existent;
- `DELETE /api/clienti/[id]` - șterge un client;
- `POST /api/facturi` - creează o factură și trimite email prin SendGrid.

# 4.3 Autentificare și autorizare servicii

Autentificarea utilizatorilor este realizată folosind JWT (JSON Web Token).
Tokenul este salvat într-un cookie HTTP-only și este utilizat pentru menținerea sesiunii active după refresh-ul paginii.
Cheile și datele sensibile sunt stocate în fișierul .env și în variabilele de mediu din Vercel.

Exemplu:

```env
NEXT_ATLAS_URI=...
```

Pentru trimiterea automată a emailurilor prin SendGrid a fost utilizată o cheie API stocată tot în fișierul `.env`.

```env
SENDGRID_API_KEY=...
```

În cazul autentificării JWT, cheia secretă utilizată pentru generarea și verificarea tokenurilor este salvată într-o variabilă de mediu.

```env
JWT_SECRET=...
```

# 5. Capturi de ecran

**Pagina inițială - Autentificare**
![Autentificare](screenshots/login-page.png)

**Pagina de înregistrare - Creare cont nou**
![Înregistrare](screenshots/register-page.png)

**Pagina principală**
![Pagina_principala](screenshots/home-page.png)

**Pagina vizualizare clienți - User**
![Clienti_user](screenshots/clienti-user.png)

**Pagina vizualizare produse - User**
![Produse_user](screenshots/produse-user.png)

**Pagina vizualizare facturi - User**
![Facturi_user](screenshots/facturi-user.png)

**Pagina gestionare clienți - Admin**
![Clienti_admin](screenshots/clienti-admin.png)

**Pagina editare client - Admin**
![Client_edit](screenshots/edit-client.png)

**Pagina adăugare client - Admin**
![Client_add](screenshots/add-client.png)

**Pagina gestionare produse - Admin**
![Produse_admin](screenshots/produse-admin.png)

**Pagina editare produs - Admin**
![Produs_edit](screenshots/edit-produs.png)

**Pagina adăugare produs - Admin**
![Produs_add](screenshots/add-produs.png)

**Pagina gestionare facturi - Admin**
![Facturi_admin](screenshots/facturi-admin.png)

**Pagina adăugare factură - Admin**
![Factura_add](screenshots/add-factura.png)
![Factura_add_ex](screenshots/add-factura-example.png)

**Email**
![Email](screenshots/sendgrid-email.png)

---

# 6. Referințe

1. https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/
2. https://nodejs.org/docs/latest/api/
3. https://react.dev/learn
4. https://nextjs.org/docs
5. https://www.shecodes.io/cheatsheets/javascript