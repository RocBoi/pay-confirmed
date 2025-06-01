---

### 📄 `docs/database-schema.md`

```md
# Database Schema

### Business

- `businessName: String`
- `email: String`
- `password: String (hashed)`
- `EIN: String`
- `fedTaxID: String`
- `stateTaxID: String`
- `controlNumber: String`

### Employee

- `name: String`
- `email: String`
- `business: ObjectId (ref)`
- `role: String`

### Payroll

- `employee: ObjectId (ref)`
- `payPeriod: String`
- `grossPay: Number`
- `taxes: Number`
- `netPay: Number`
