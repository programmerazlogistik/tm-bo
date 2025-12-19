# Back Office Contract API Specifications

**SISTEM APPROVAL WORKFLOW BARU**:

Implementasi service layer menggunakan approval workflow system yang memisahkan antara:

- **Main Contract Status**: Hanya dapat diubah oleh CS/GM secara manual
- **Approval Workflow**: Tracking approval status untuk setiap perubahan

### Approval Workflow Fields:

- `currentApprovalType`: Tipe approval (TRANSLATION, FINAL_APPROVAL, CANCELLED, dll)
- `currentApprovalStatus`: Status approval (PENDING, APPROVED, REJECTED)
- `currentApprovalRequiresFrom`: Siapa yang perlu approve (CS, ADMIN, GM)

### Key Behaviors:

1. **Admin Update Contract**: Status tetap, approval workflow set ke TRANSLATION → GM approve (requiresApprovalFrom: GM)
2. **GM Approval/Rejection**: Status tetap, approval workflow updated → CS ubah status (requiresApprovalFrom: CS)
3. **Buyer/Seller Cancel Request**: Status tetap, approval workflow set ke CANCELLED → ADMIN translate → CS approve (requiresApprovalFrom: ADMIN)

Hanya CS yang dapat mengubah main contract status berdasarkan approval workflow yang sudah diproses.

**Alur Approval:**

- Admin update → GM review → CS change status
- Buyer/Seller cancel → Admin translate → CS approve cancellation
- GM approve/reject → CS change status accordingly

## Daftar Endpoint

### Section 1: List Management API

[x] 1. [Get Contract List](#get-contract-list) - `GET /v1/bo/contracts` - **(List Kontrak dengan Multiple Tabs)**

### Section 2: Contract Management API

[x] 2. [Get Contract Detail](#get-contract-detail) - `GET /v1/bo/contracts/{contractId}` - **(Tab Utama)**
[] 3. [Update Contract](#update-contract) - `PUT /v1/bo/contracts/{contractId}` (Terdapat Perubahan)
[] 4. [Cancel Contract](#cancel-contract) - `PUT /v1/bo/contracts/{contractId}/cancel` (Terdapat Perubahan)
[x] 5. [Get Contract History](#get-contract-history) - `GET /v1/bo/contracts/{contractId}/history` - **(Tab Riwayat)**

### Section 3: Approval Workflows API

[x] 6. [GM Approval](#gm-approval) - `POST /v1/bo/contracts/{contractId}/gm-approval` (Terdapat Perubahan)

### Section 4: Attachment Management API

[] 7. [Upload Attachment](#upload-attachment) - `POST /v1/bo/contracts/{contractId}/attachments`
[] 8. [Delete Attachment](#delete-attachment) - `DELETE /v1/bo/contracts/{contractId}/attachments/{attachmentId}`
[] 9. [Upload PI Document](#upload-pi-document) - `POST /v1/bo/contracts/{contractId}/pi-documents/upload`
[] 10. [Delete PI Document](#delete-pi-document) - `DELETE /v1/bo/contracts/{contractId}/pi-documents/{piDocumentId}`
[] 11. [Verify PI Document](#verify-pi-document) - `PUT /v1/bo/contracts/{contractId}/pi-documents/{piDocumentId}/verify`

### Section 5: Supporting API

[] 12. [Translate Attachment Description](#translate-attachment-description) - `POST /v1/bo/contracts/{contractId}/translate`
[] 13. [Upload Physical Contract](#upload-physical-contract) - `POST /v1/bo/contracts/{contractId}/physical-contract/upload`

---

**Note**:

- **Get Contract Detail** (Tab Utama) dan **Get Contract History** (Tab Riwayat) adalah **dua endpoint yang berbeda**.
- Get Contract Detail menampilkan informasi lengkap kontrak untuk tab utama.
- Get Contract History menampilkan timeline perubahan dan aktivitas kontrak untuk tab riwayat.

---

# Get Contract List

## Endpoint

```
GET /v1/bo/contracts
```

## Deskripsi

Mengambil daftar kontrak dengan support untuk multiple tabs (Transaksi, Pengajuan, Butuh Approval, Riwayat), filter, sorting, dan pagination.

## LD References

- LWK-1 - Tab Transaksi List dengan Data
- LWK-2 - Tab Transaksi List Tidak Ada Data
- LWK-4 - Tab Transaksi Filter
- LWK-5 - Tab Transaksi Filter Ditemukan
- LWK-6 - Tab Transaksi Filter Tidak Ditemukan
- LWK-7 - Tab Transaksi Sorting Ascending
- LWK-8 - Tab Transaksi Sorting Descending
- LWK-9 - Tab Pengajuan List dengan Data
- LWK-10 - Tab Pengajuan List Tidak Ada Data
- LWK-11 - Tab Pengajuan Filter
- LWK-14 - Tab Pengajuan Sorting Ascending
- LWK-15 - Tab Pengajuan Sorting Descending
- LWK-16 - Tab Riwayat List dengan Data
- LWK-17 - Tab Riwayat List Tidak Ada Data
- LWK-18 - Tab Riwayat Filter
- LWK-23 - Tab Butuh Approval List dengan Data
- LWK-24 - Tab Butuh Approval List Tidak Ada Data
- LWK-25 - Tab Butuh Approval Filter

## Query Parameters

| Parameter               | Type    | Required | Default      | Description                                                                                    |
| ----------------------- | ------- | -------- | ------------ | ---------------------------------------------------------------------------------------------- |
| `tab`                   | string  | No       | "transaksi"  | Tab yang dipilih: "transaksi", "pengajuan", "butuh_approval", "riwayat"                        |
| `page`                  | integer | No       | 1            | Nomor halaman                                                                                  |
| `limit`                 | integer | No       | 10           | Jumlah data per halaman (10, 25, 50, 100)                                                      |
| `sort_by`               | string  | No       | "created_at" | Field untuk sorting: "inquiry_number", "buyer_name", "seller_name", "created_at", "updated_at" |
| `sort_order`            | string  | No       | "desc"       | Urutan sorting: "asc", "desc"                                                                  |
| `inquiry_number`        | string  | No       | -            | Filter by inquiry number                                                                       |
| `contract_number`       | string  | No       | -            | Filter by contract number (untuk tab transaksi & riwayat)                                      |
| `buyer_name`            | string  | No       | -            | Filter by buyer name                                                                           |
| `buyer_phone`           | string  | No       | -            | Filter by buyer phone                                                                          |
| `seller_name`           | string  | No       | -            | Filter by seller name                                                                          |
| `seller_email`          | string  | No       | -            | Filter by seller email                                                                         |
| `buyer_type`            | string  | No       | -            | Filter: "BADAN_USAHA", "INDIVIDU"                                                              |
| `item_type`             | string  | No       | -            | Filter: "LARTAS", "NON_LARTAS"                                                                 |
| `status`                | string  | No       | -            | Filter by status (list specific to each tab)                                                   |
| `status_periode`        | array   | No       | -            | Filter: ["AKTIF", "AKAN_DATANG", "KUOTA_HABIS"]                                                |
| `discount_min`          | number  | No       | -            | Minimal diskon (%)                                                                             |
| `discount_max`          | number  | No       | -            | Maksimal diskon (%)                                                                            |
| `created_date_start`    | date    | No       | -            | Tanggal dibuat awal (YYYY-MM-DD)                                                               |
| `created_date_end`      | date    | No       | -            | Tanggal dibuat akhir (YYYY-MM-DD)                                                              |
| `updated_date_start`    | date    | No       | -            | Tanggal update awal (YYYY-MM-DD)                                                               |
| `updated_date_end`      | date    | No       | -            | Tanggal update akhir (YYYY-MM-DD)                                                              |
| `contract_period_start` | date    | No       | -            | Filter periode kontrak awal                                                                    |
| `contract_period_end`   | date    | No       | -            | Filter periode kontrak akhir                                                                   |
| `seller_country`        | string  | No       | -            | Filter by seller country                                                                       |

## Status Values by Tab

- **Transaksi**: `PHYSICAL_CONTRACT_COMPLETED`
- **Pengajuan**: `NEED_RESPONSE`, `AWAITING_REJECTION_CONFIRMATION`, `NEGOTIATION_PROCESS`
- **Butuh Approval**: `AWAITING_FINAL_APPROVAL`
- **Riwayat**: All statuses

## Validation Rules

- `tab` must be one of: "transaksi", "pengajuan", "butuh_approval", "riwayat"
- `page` must be >= 1
- `limit` must be one of: 10, 25, 50, 100
- `sort_by` must be one of: "inquiry_number", "buyer_name", "seller_name", "created_at", "updated_at"
- `sort_order` must be one of: "asc", "desc"
- `buyer_type` must be one of: "BADAN_USAHA", "INDIVIDU"
- `item_type` must be one of: "LARTAS", "NON_LARTAS"
- Date filters must be in format YYYY-MM-DD
- `discount_min` and `discount_max` must be between 0 and 100
- User must have appropriate role to view contracts

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Daftar kontrak berhasil diambil"
  },
  "Data": {
    "total": 150,
    "totalPages": 15,
    "currentPage": 1,
    "limit": 10,
    "counters": {
      "transaksi": 45,
      "pengajuan": 23,
      "butuhApproval": 8,
      "riwayat": 150
    },
    "items": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "inquiryNumber": "INQ/20251107/MPP/000123",
        "contractNumber": "CTR/20251107/MPP/000098",
        "buyer": {
          "id": 1001,
          "name": "PT Maju Jaya",
          "type": "BADAN_USAHA",
          "phone": "+628123456789",
          "email": "buyer@majujaya.com"
        },
        "seller": {
          "id": "450e8400-e29b-41d4-a716-446655440001",
          "name": "Shanghai Trading Co",
          "country": "China",
          "email": "seller@shanghai.com"
        },
        "status": "NEED_RESPONSE",
        "itemType": "NON_LARTAS",
        "createdAt": "2025-11-07T10:30:00Z",
        "updatedAt": "2025-11-07T15:45:00Z",
        "approvalStatus": null
      }
    ]
  },
  "Type": "GET_CONTRACTS_LIST"
}
```

### Response Field Descriptions

| Field            | Type   | Database Reference                                       | Description              |
| ---------------- | ------ | -------------------------------------------------------- | ------------------------ |
| `id`             | uuid   | `dbt_mpp_int_buyer_seller_contracts.id`                  | ID kontrak               |
| `inquiryNumber`  | string | `dbt_mpp_int_buyer_seller_contracts.inquiry_number`      | Nomor inquiry            |
| `contractNumber` | string | `dbt_mpp_int_buyer_seller_contracts.contract_number`     | Nomor kontrak            |
| `buyer.id`       | int    | `dbt_mpp_int_buyer_seller_contracts.buyer_id`            | ID buyer                 |
| `buyer.name`     | string | `dbt_mpp_int_buyer_seller_contracts.buyer_company_name`  | Nama buyer atau user     |
| `buyer.type`     | string | `dbt_mpp_int_buyer_seller_contracts.buyer_type`          | Tipe buyer               |
| `seller.id`      | uuid   | `dbt_mpp_int_buyer_seller_contracts.seller_id`           | ID seller                |
| `seller.name`    | string | `dbt_mpp_int_seller.company_name`                        | Nama perusahaan seller   |
| `seller.country` | string | `dbt_mpp_int_seller.country`                             | Negara seller            |
| `status`         | string | `dbt_mpp_int_buyer_seller_contracts.status`              | Status kontrak           |
| `createdAt`      | date   | `dbt_mpp_int_buyer_seller_contracts.inquiry_received_at` | Tanggal kontrak dibuat   |
| `updatedAt`      | date   | `dbt_mpp_int_buyer_seller_contracts.updated_at`          | Tanggal kontrak diupdate |

## Response Error (400 Bad Request)

```json
{
  "Message": {
    "Code": 400,
    "Text": "Parameter tidak valid"
  },
  "Data": {
    "errors": [
      {
        "field": "sort_by",
        "message": "Field sort_by tidak valid. Pilihan yang valid: inquiry_number, buyer_name, seller_name, created_at, updated_at"
      }
    ]
  },
  "Type": "GET_CONTRACTS_LIST_ERROR"
}
```

## Response Error (401 Unauthorized)

```json
{
  "Message": {
    "Code": 401,
    "Text": "Token tidak valid atau sudah expired"
  },
  "Data": null,
  "Type": "UNAUTHORIZED_ERROR"
}
```

## Response Error (403 Forbidden)

```json
{
  "Message": {
    "Code": 403,
    "Text": "Forbidden"
  },
  "Error": {
    "code": "FORBIDDEN",
    "message": "User does not have permission to view contracts"
  },
  "Type": "GET_CONTRACTS_LIST_ERROR"
}
```

## Response Empty Result (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Daftar kontrak berhasil diambil"
  },
  "Data": {
    "total": 0,
    "totalPages": 0,
    "currentPage": 1,
    "limit": 10,
    "counters": {
      "transaksi": 0,
      "pengajuan": 0,
      "butuhApproval": 0,
      "riwayat": 0
    },
    "items": []
  },
  "Type": "GET_CONTRACTS_LIST"
}
```

---

# Get Contract Detail

## Endpoint

```
GET /v1/bo/contracts/{contractId}
```

## Deskripsi

Mengambil detail lengkap kontrak termasuk informasi buyer, seller, items, attachments, dan status history.

## LD References

- LWK-30 - Detail Pengajuan Kontrak Badan Usaha Non Lartas
- LWK-33 - Detail Pengajuan Setelah Translate
- LWK-34 - Detail Pengajuan Disetujui
- LWK-35 - Detail Pengajuan Ditolak
- LWK-36 - Detail Pengajuan Badan Usaha Lartas
- LWK-42 - Detail Pengajuan Individu Non Lartas
- LWK-45 - Detail Pengajuan Individu Setelah Translate
- LWK-46 - Detail Pengajuan Individu Disetujui
- LWK-47 - Detail Pengajuan Individu Ditolak
- LWK-48 - Detail Penolakan Penjual
- LWK-49 - Detail Draft Kontrak Badan Usaha Non Lartas

## Path Parameters

| Parameter    | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| `contractId` | uuid | Yes      | ID kontrak  |

## Validation Rules

- `contractId` must be valid UUID format
- Contract must exist in database
- User must have appropriate role to view contract details

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Detail kontrak berhasil diambil"
  },
  "Data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "inquiryNumber": "INQ/20251107/MPP/000123",
    "contractNumber": "CTR/20251107/MPP/000098",
    "status": "NEED_RESPONSE",
    "buyer": {
      "id": 1001,
      "type": "BADAN_USAHA",
      "name": "PT Maju Jaya",
      "companyName": "PT Maju Jaya",
      "npwp": "01.234.567.8-901.000",
      "npwpFile": "/documents/npwp_123.pdf",
      "nib": "1234567890123",
      "nibFile": "/documents/nib_123.pdf",
      "sppkpFile": "/documents/sppkp_123.pdf",
      "phone": "+628123456789",
      "whatsapp": "+628123456789",
      "email": "buyer@majujaya.com",
      "verificationStatus": "VERIFIED"
    },
    "seller": {
      "id": "450e8400-e29b-41d4-a716-446655440001",
      "companyName": "Shanghai Trading Co",
      "country": "China",
      "email": "seller@shanghai.com",
      "picName": "John Zhang",
      "picPhone": "+8613800138000",
      "locationId": "650e8400-e29b-41d4-a716-446655440002",
      "language": "zh"
    },
    "contractPeriod": {
      "startDate": "2025-12-01",
      "endDate": "2026-11-30"
    },
    "payment": {
      "method": "TT_TELEGRAPHIC_TRANSFER",
      "term": "30% DP, 70% Before Shipping",
      "termTranslation": "30% Uang Muka, 70% Sebelum Pengiriman"
    },
    "shipping": {
      "incoterm": "CIF",
      "originPort": "Shanghai Port",
      "destinationPort": "Jakarta - Tanjung Priok",
      "destinationCity": "Jakarta, DKI Jakarta"
    },
    "notes": "Please ensure all products meet Indonesian standards",
    "notesTranslation": "Mohon pastikan semua produk memenuhi standar Indonesia",
    "selectedLanguage": {
      "id": "760e8400-e29b-41d4-a716-446655440003",
      "code": "id",
      "name": "Bahasa Indonesia"
    },
    "items": [
      {
        "id": "850e8400-e29b-41d4-a716-446655440004",
        "productId": "950e8400-e29b-41d4-a716-446655440005",
        "productName": "Industrial Machine Parts A123",
        "hsCode": "8409.91.00",
        "isLartas": false,
        "quantity": 1000,
        "unitPrice": 150.0,
        "totalPrice": 150000.0,
        "currency": "USD",
        "catalogPrice": 160.0,
        "discountPercentage": 6.25,
        "specifications": {
          "material": "Steel",
          "weight": "2.5kg",
          "dimensions": "10x10x5cm"
        }
      }
    ],
    "attachments": [
      {
        "id": "a50e8400-e29b-41d4-a716-446655440006",
        "fileName": "technical_specification.pdf",
        "filePath": "/contracts/attachments/tech_spec_123.pdf",
        "fileSize": 2048576,
        "fileType": ".pdf",
        "description": "Technical specification for machine parts",
        "descriptionTranslation": "Spesifikasi teknis untuk suku cadang mesin",
        "uploadedBy": "BUYER",
        "uploadedAt": "2025-11-07T10:30:00Z"
      }
    ],
    "proformaInvoices": [],
    "timeline": {
      "inquiryReceivedAt": "2025-11-07T10:30:00Z",
      "respondDeadline": "2025-11-14T23:59:59Z",
      "draftContractSentAt": null,
      "buyerApprovedAt": null,
      "finalApprovalDeadline": null,
      "sellerFinalApprovedAt": null,
      "physicalContractCompletedAt": null
    },
    "rejectionInfo": null,
    "cancellationInfo": null,
    "totalValue": 150000.0,
    "currency": "USD",
    "hasImportPermit": false,
    "physicalContractFile": null,
    "canEdit": true,
    "canCancel": true,
    "canApprove": false,
    "createdAt": "2025-11-07T10:30:00Z",
    "updatedAt": "2025-11-07T15:45:00Z"
  },
  "Type": "GET_CONTRACT_DETAIL"
}
```

### Response Field Descriptions

| Field                                  | Type    | Database Reference                                                  | Description                     |
| -------------------------------------- | ------- | ------------------------------------------------------------------- | ------------------------------- |
| `id`                                   | uuid    | `dbt_mpp_int_buyer_seller_contracts.id`                             | ID kontrak                      |
| `inquiryNumber`                        | string  | `dbt_mpp_int_buyer_seller_contracts.inquiry_number`                 | Nomor inquiry                   |
| `contractNumber`                       | string  | `dbt_mpp_int_buyer_seller_contracts.contract_number`                | Nomor kontrak                   |
| `status`                               | string  | `dbt_mpp_int_buyer_seller_contracts.status`                         | Status kontrak                  |
| `buyer.id`                             | int     | `dbt_mpp_int_buyer_seller_contracts.buyer_id`                       | ID buyer                        |
| `buyer.type`                           | string  | `dbt_mpp_int_buyer_seller_contracts.buyer_type`                     | Tipe buyer                      |
| `buyer.companyName`                    | string  | `dbt_mpp_int_buyer_seller_contracts.buyer_company_name`             | Nama perusahaan buyer           |
| `buyer.npwp`                           | string  | `dbt_mpp_int_buyer_seller_contracts.buyer_npwp_number`              | NPWP buyer                      |
| `buyer.npwpFile`                       | string  | `dbt_mpp_int_buyer_seller_contracts.buyer_npwp_file`                | File NPWP buyer                 |
| `buyer.nib`                            | string  | `dbt_mpp_int_buyer_seller_contracts.buyer_nib_number`               | NIB buyer                       |
| `buyer.nibFile`                        | string  | `dbt_mpp_int_buyer_seller_contracts.buyer_nib_file`                 | File NIB buyer                  |
| `buyer.sppkpFile`                      | string  | `dbt_mpp_int_buyer_seller_contracts.buyer_sppkp_file`               | File SPPKP buyer                |
| `seller.id`                            | uuid    | `dbt_mpp_int_buyer_seller_contracts.seller_id`                      | ID seller                       |
| `seller.companyName`                   | string  | `dbt_mpp_int_seller.company_name`                                   | Nama perusahaan seller          |
| `seller.locationId`                    | uuid    | `dbt_mpp_int_buyer_seller_contracts.shipped_from_location_id`       | ID lokasi pengiriman seller     |
| `contractPeriod.startDate`             | date    | `dbt_mpp_int_buyer_seller_contracts.start_date`                     | Tanggal mulai kontrak           |
| `contractPeriod.endDate`               | date    | `dbt_mpp_int_buyer_seller_contracts.end_date`                       | Tanggal selesai kontrak         |
| `payment.method`                       | string  | `dbt_mpp_int_buyer_seller_contracts.payment_method`                 | Metode pembayaran               |
| `payment.term`                         | string  | `dbt_mpp_int_buyer_seller_contracts.payment_term`                   | Syarat pembayaran               |
| `payment.termTranslation`              | string  | `dbt_mpp_int_buyer_seller_contracts.payment_term_translation`       | Terjemahan syarat pembayaran    |
| `shipping.incoterm`                    | string  | `dbt_mpp_int_buyer_seller_contracts.incoterm`                       | Incoterm pengiriman             |
| `shipping.destinationPort`             | string  | `dbt_mpp_int_buyer_seller_contracts.destination_port`               | Pelabuhan tujuan                |
| `shipping.destinationCity`             | string  | `dbt_mpp_int_buyer_seller_contracts.destination_city`               | Kota tujuan                     |
| `notes`                                | string  | `dbt_mpp_int_buyer_seller_contracts.notes`                          | Catatan kontrak                 |
| `notesTranslation`                     | string  | `dbt_mpp_int_buyer_seller_contracts.notes_translation`              | Terjemahan catatan kontrak      |
| `selectedLanguage.id`                  | uuid    | `dbt_mpp_int_buyer_seller_contracts.selected_language_id`           | ID bahasa yang dipilih          |
| `items[].id`                           | uuid    | `dbt_mpp_int_contract_items.id`                                     | ID item kontrak                 |
| `items[].productName`                  | string  | `dbt_mpp_int_contract_items.product_name`                           | Nama produk                     |
| `items[].hsCode`                       | string  | `dbt_mpp_int_contract_items.hs_code`                                | Kode HS produk                  |
| `items[].isLartas`                     | boolean | `dbt_mpp_int_contract_items.is_restricted_item`                     | Status lartas produk            |
| `items[].quantity`                     | number  | `dbt_mpp_int_contract_items.quantity`                               | Jumlah produk                   |
| `items[].unitPrice`                    | number  | `dbt_mpp_int_contract_items.unit_price`                             | Harga per unit                  |
| `items[].totalPrice`                   | number  | `dbt_mpp_int_contract_items.total_price`                            | Total harga                     |
| `items[].currency`                     | string  | `dbt_mpp_int_contract_items.currency`                               | Mata uang                       |
| `attachments[].id`                     | uuid    | `dbt_mpp_int_contract_attachments.id`                               | ID attachment                   |
| `attachments[].fileName`               | string  | `dbt_mpp_int_contract_attachments.file_name`                        | Nama file attachment            |
| `attachments[].filePath`               | string  | `dbt_mpp_int_contract_attachments.file_path`                        | Path file attachment            |
| `attachments[].fileSize`               | number  | `dbt_mpp_int_contract_attachments.file_size`                        | Ukuran file (bytes)             |
| `attachments[].fileType`               | string  | `dbt_mpp_int_contract_attachments.file_type`                        | Tipe file                       |
| `attachments[].description`            | string  | `dbt_mpp_int_contract_attachments.description`                      | Deskripsi attachment            |
| `attachments[].descriptionTranslation` | string  | `dbt_mpp_int_contract_attachments.description_translation`          | Terjemahan deskripsi attachment |
| `attachments[].uploadedBy`             | string  | `dbt_mpp_int_contract_attachments.uploaded_by_type`                 | Tipe pengunggah                 |
| `attachments[].uploadedAt`             | date    | `dbt_mpp_int_contract_attachments.created_at`                       | Tanggal upload                  |
| `timeline.inquiryReceivedAt`           | date    | `dbt_mpp_int_buyer_seller_contracts.inquiry_received_at`            | Tanggal inquiry diterima        |
| `timeline.respondDeadline`             | date    | `dbt_mpp_int_buyer_seller_contracts.respond_deadline`               | Batas waktu respon              |
| `timeline.draftContractSentAt`         | date    | `dbt_mpp_int_buyer_seller_contracts.draft_contract_sent_at`         | Tanggal draft kontrak dikirim   |
| `timeline.buyerApprovedAt`             | date    | `dbt_mpp_int_buyer_seller_contracts.buyer_approved_at`              | Tanggal buyer approve           |
| `timeline.finalApprovalDeadline`       | date    | `dbt_mpp_int_buyer_seller_contracts.final_approval_deadline`        | Batas waktu approval akhir      |
| `timeline.sellerFinalApprovedAt`       | date    | `dbt_mpp_int_buyer_seller_contracts.seller_final_approved_at`       | Tanggal seller approve akhir    |
| `timeline.physicalContractCompletedAt` | date    | `dbt_mpp_int_buyer_seller_contracts.physical_contract_completed_at` | Tanggal kontrak fisik selesai   |
| `totalValue`                           | number  | `dbt_mpp_int_buyer_seller_contracts.total_contract_value`           | Total nilai kontrak             |
| `currency`                             | string  | `dbt_mpp_int_buyer_seller_contracts.currency`                       | Mata uang kontrak               |
| `hasImportPermit`                      | boolean | `dbt_mpp_int_buyer_seller_contracts.has_import_permit`              | Status izin impor               |
| `physicalContractFile`                 | string  | `dbt_mpp_int_buyer_seller_contracts.physical_contract_file_path`    | Path file kontrak fisik         |

## Response Error (400 Bad Request)

```json
{
  "Message": {
    "Code": 400,
    "Text": "Parameter tidak valid"
  },
  "Data": {
    "errors": [
      {
        "field": "contractId",
        "message": "Invalid UUID format"
      }
    ]
  },
  "Type": "GET_CONTRACT_DETAIL_ERROR"
}
```

## Response Error (401 Unauthorized)

```json
{
  "Message": {
    "Code": 401,
    "Text": "Token tidak valid atau sudah expired"
  },
  "Data": null,
  "Type": "UNAUTHORIZED_ERROR"
}
```

## Response Error (403 Forbidden)

```json
{
  "Message": {
    "Code": 403,
    "Text": "Forbidden"
  },
  "Error": {
    "code": "FORBIDDEN",
    "message": "User does not have permission to view this contract"
  },
  "Type": "GET_CONTRACT_DETAIL_ERROR"
}
```

## Response Error (404 Not Found)

```json
{
  "Message": {
    "Code": 404,
    "Text": "Contract not found"
  },
  "Error": {
    "code": "NOT_FOUND",
    "message": "Contract with ID 550e8400-e29b-41d4-a716-446655440000 not found"
  },
  "Type": "GET_CONTRACT_DETAIL_ERROR"
}
```

---

# Update Contract

## Endpoint

```
PUT /v1/bo/contracts/{contractId}
```

## Deskripsi

Update kontrak oleh admin dengan dukungan **4 tipe update** yang berbeda berdasarkan kebutuhan workflow.

**CATATAN PENTING**:

- Main contract status **TIDAK BERUBAH** saat admin update
- Hanya CS/GM yang dapat mengubah main contract status
- Admin update akan trigger approval workflow dengan `currentApprovalStatus`: PENDING
- Contract category di-detect otomatis berdasarkan `buyerType` dan `itemType` (LARTAS/NON_LARTAS)

## Contract Categories (Auto-Detected)

| Category                 | Buyer Type  | Item Type  | Special Requirements                                   |
| ------------------------ | ----------- | ---------- | ------------------------------------------------------ |
| `BADAN_USAHA_LARTAS`     | BADAN_USAHA | LARTAS     | Requires remainingQuota, documentPI, languageSelection |
| `BADAN_USAHA_NON_LARTAS` | BADAN_USAHA | NON_LARTAS | -                                                      |
| `INDIVIDU_NON_LARTAS`    | INDIVIDU    | NON_LARTAS | Requires languageSelection                             |

## Path Parameters

| Parameter    | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| `contractId` | uuid | Yes      | ID kontrak  |

---

## Update Type 1: UPDATE_PENGAJUAN_KONTRAK (Default)

Untuk update pengajuan kontrak dari buyer. Data disimpan di kolom `expected*`.

### Allowed Status

- `NEED_RESPONSE`
- `AWAITING_REJECTION_CONFIRMATION`

### Request Body

```json
{
  "updateType": "UPDATE_PENGAJUAN_KONTRAK",
  "contractPeriod": {
    "startDate": "2025-12-01",
    "endDate": "2026-11-30"
  },
  "payment": {
    "method": "TT_TELEGRAPHIC_TRANSFER",
    "term": "30% DP, 70% Before Shipping",
    "termTranslation": "30% Uang Muka, 70% Sebelum Pengiriman"
  },
  "shipping": {
    "incoterm": "CIF",
    "originPort": "Shanghai Port",
    "destinationPort": "Jakarta - Tanjung Priok",
    "destinationCity": "Jakarta, DKI Jakarta"
  },
  "notes": "Updated notes",
  "notesTranslation": "Catatan yang diperbarui",
  "selectedLanguageId": "760e8400-e29b-41d4-a716-446655440003",
  "productDetails": [
    {
      "productItemId": "prod_item_uuid_1",
      "quantity": 100,
      "remainingQuota": 150
    }
  ],
  "documentAttachments": [
    {
      "fileName": "contract_attachment.pdf",
      "fileUrl": "https://storage.muatparts.com/contracts/attachments/contract_attachment.pdf",
      "fileDescription": "Contract supporting document",
      "fileDescriptionTranslation": "Dokumen pendukung kontrak"
    }
  ],
  "documentPI": "pi-document-uuid (optional, for Lartas only)"
}
```

### Field Mapping (Expected Columns)

| Request Field              | Database Column             |
| -------------------------- | --------------------------- |
| `contractPeriod.startDate` | `expected_start_date`       |
| `contractPeriod.endDate`   | `expected_end_date`         |
| `payment.method`           | `expected_payment_method`   |
| `payment.term`             | `expected_payment_term`     |
| `shipping.incoterm`        | `expected_incoterm`         |
| `shipping.originPort`      | `expected_origin_port`      |
| `shipping.destinationPort` | `expected_destination_port` |

---

## Update Type 2: DRAFT_KONTRAK

Untuk membuat/update draft kontrak (penawaran dari seller). Data disimpan di kolom aktual (bukan `expected*`).

### Allowed Status

- `NEED_RESPONSE`
- `NEGOTIATION_PROCESS`

### Request Body

```json
{
  "updateType": "DRAFT_KONTRAK",
  "selectedLanguageId": "760e8400-e29b-41d4-a716-446655440003",
  "draftContractFile": "https://storage.muatparts.com/contracts/draft/draft-contract.pdf",
  "notes": "Draft contract notes",
  "notesTranslation": "Catatan draft kontrak",
  "buyerResponseDeadline": "2025-12-15T23:59:59Z",
  "contractPeriod": {
    "startDate": "2025-12-01",
    "endDate": "2026-11-30"
  },
  "payment": {
    "method": "TT_TELEGRAPHIC_TRANSFER",
    "term": "30% DP, 70% Before Shipping",
    "termTranslation": "30% Uang Muka, 70% Sebelum Pengiriman"
  },
  "shipping": {
    "incoterm": "CIF",
    "originPort": "Shanghai Port",
    "destinationPort": "Jakarta - Tanjung Priok",
    "destinationCity": "Jakarta, DKI Jakarta"
  },
  "productDetails": [
    {
      "productItemId": "prod_item_uuid_1",
      "quantityOffer": 100,
      "unitPriceOffer": 25.5
    }
  ]
}
```

### Field Mapping (Actual Columns)

| Request Field              | Database Column           |
| -------------------------- | ------------------------- |
| `contractPeriod.startDate` | `start_date`              |
| `contractPeriod.endDate`   | `end_date`                |
| `payment.method`           | `payment_method`          |
| `payment.term`             | `payment_term`            |
| `shipping.incoterm`        | `incoterm`                |
| `shipping.originPort`      | `origin_port`             |
| `shipping.destinationPort` | `destination_port`        |
| `draftContractFile`        | `attachment_file_path`    |
| `buyerResponseDeadline`    | `final_approval_deadline` |

### Special Requirements

- `selectedLanguageId` **required** untuk category `BADAN_USAHA_LARTAS` dan `INDIVIDU_NON_LARTAS`
- `productDetails.quantityOffer` = Kuantitas Penawaran
- `productDetails.unitPriceOffer` = Harga Penawaran (stored in `unit_price`)

---

## Update Type 3: PEMBATALAN_KONTRAK

Untuk update alasan pembatalan kontrak.

### Allowed Status

- `NEED_RESPONSE`
- `AWAITING_REJECTION_CONFIRMATION`
- `NEGOTIATION_PROCESS`
- `AWAITING_FINAL_APPROVAL`

### Request Body

```json
{
  "updateType": "PEMBATALAN_KONTRAK",
  "alasanPembatalan": "Kontrak dibatalkan karena perubahan kebutuhan bisnis dari pihak buyer"
}
```

### Validation Rules

- `alasanPembatalan` **required**, minimum 10 karakter
- Jika contract belum memiliki `cancelledAt`, akan di-set timestamp dan `cancelledByType` = 'ADMIN'

---

## Update Type 4: PENOLAKAN_KONTRAK

Untuk update alasan penolakan dari seller.

### Allowed Status

- `AWAITING_REJECTION_CONFIRMATION`

### Request Body

```json
{
  "updateType": "PENOLAKAN_KONTRAK",
  "alasanPenolakanPenjual": "Seller menolak kontrak karena harga tidak sesuai dengan standar pasar saat ini"
}
```

### Validation Rules

- `alasanPenolakanPenjual` **required**, minimum 10 karakter
- Updates `rejection_reason` dan `rejection_notes` columns
- Sets `awaiting_rejection_by_admin` = true

---

## Validation Rules (Common)

### Incoterm Rules

| Incoterm | Origin Port  | Destination Port |
| -------- | ------------ | ---------------- |
| `EXW`    | Not required | Not required     |
| `FOB`    | **Required** | Not required     |
| `CIF`    | **Required** | **Required**     |
| `CFR`    | **Required** | **Required**     |

### Payment

- `method` must be: `TT_TELEGRAPHIC_TRANSFER`, `LC_LETTER_OF_CREDIT`, `OPEN_ACCOUNT`
- `term` minimum 10 chars, maximum 500 chars
- `termTranslation` optional, minimum 10 chars if provided

### Product Details for UPDATE_PENGAJUAN_KONTRAK

- `productItemId` required, must be valid UUID
- `quantity` atau `quantityRequest` required, must be > 0
- **For LARTAS**: `quantityRequest` tidak boleh melebihi `remainingQuota`

### Product Details for DRAFT_KONTRAK

- `productItemId` required, must be valid UUID
- `quantityOffer` (Kuantitas Penawaran)
- `unitPriceOffer` (Harga Penawaran)

### Document Attachments

- `documentAttachments` optional
- `fileName` required, allowed extensions: .pdf, .doc, .docx, .xls, .xlsx
- `fileUrl` required, must be valid HTTPS URL
- `fileDescription` required, minimum 5 chars, maximum 200 chars
- Maximum 20 attachments per contract

---

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Kontrak berhasil diperbarui"
  },
  "Data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "inquiryNumber": "INQ/20251107/MPP/000123",
    "status": "NEED_RESPONSE",
    "updatedAt": "2025-11-07T16:00:00Z",
    "updatedBy": "admin@muatparts.com",
    "updateType": "UPDATE_PENGAJUAN_KONTRAK",
    "category": {
      "buyerType": "BADAN_USAHA",
      "itemType": "NON_LARTAS",
      "category": "BADAN_USAHA_NON_LARTAS"
    },
    "approval": {
      "type": "TRANSLATION",
      "status": "PENDING",
      "requiresApprovalFrom": "GM"
    }
  },
  "Type": "UPDATE_CONTRACT_SUCCESS"
}
```

### Response Fields

| Field                | Description                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `updateType`         | Tipe update yang digunakan                                                               |
| `category.buyerType` | `BADAN_USAHA` atau `INDIVIDU`                                                            |
| `category.itemType`  | `LARTAS` atau `NON_LARTAS`                                                               |
| `category.category`  | Combined category: `BADAN_USAHA_LARTAS`, `BADAN_USAHA_NON_LARTAS`, `INDIVIDU_NON_LARTAS` |

### Approval Type by Update Type

| Update Type                | Approval Type         |
| -------------------------- | --------------------- |
| `UPDATE_PENGAJUAN_KONTRAK` | `TRANSLATION`         |
| `DRAFT_KONTRAK`            | `DRAFT_CONTRACT_SENT` |
| `PEMBATALAN_KONTRAK`       | `CANCELLED`           |
| `PENOLAKAN_KONTRAK`        | `REJECTION`           |

**Note**:

- Status kontrak tetap tidak berubah
- Approval workflow di-set dengan status PENDING
- GM perlu mereview dan approve perubahan yang dilakukan admin
- Setelah GM approve, CS dapat mengubah status sesuai kebutuhan

---

# Cancel Contract

## Endpoint

```
PUT /v1/bo/contracts/{contractId}/cancel
```

## Deskripsi

Request pembatalan kontrak oleh BUYER atau SELLER.

**CATATAN PENTING**:

- Ini adalah **REQUEST pembatalan**, bukan pembatalan langsung
- Main contract status **TIDAK BERUBAH** menjadi CANCELLED secara otomatis
- Hanya BUYER dan SELLER yang dapat request pembatalan
- Setelah request, approval workflow akan di-set ke:
  - `currentApprovalType`: CANCELLED
  - `currentApprovalStatus`: PENDING
  - `currentApprovalRequiresFrom`: ADMIN (ADMIN perlu translate)
- Setelah ADMIN translate, CS yang akan approve dan mengubah status menjadi CANCELLED

## Path Parameters

| Parameter    | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| `contractId` | uuid | Yes      | ID kontrak  |

## Request Body

```json
{
  "cancellationReason": "Contract cancelled due to buyer request",
  "cancelledByType": "BUYER"
}
```

| Field                | Type   | Required | Description                                            |
| -------------------- | ------ | -------- | ------------------------------------------------------ |
| `cancellationReason` | string | Ya       | Alasan pembatalan (minimal 10 karakter, max 500 chars) |
| `cancelledByType`    | string | Ya       | Tipe pembatal: "BUYER" atau "SELLER" only              |

## Validation Rules

- Contract tidak boleh dalam status `CANCELLED` atau `PHYSICAL_CONTRACT_COMPLETED`
- `cancellationReason` wajib diisi minimal 10 karakter, maximum 500 karakter
- `cancelledByType` harus "BUYER" atau "SELLER" (hanya keduanya yang boleh request cancellation)
- Contract must exist

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Permintaan pembatalan kontrak berhasil diajukan"
  },
  "Data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "inquiryNumber": "INQ/20251107/MPP/000123",
    "status": "NEED_RESPONSE",
    "cancelledAt": "2025-11-07T16:00:00Z",
    "cancelledBy": "BUYER",
    "cancellationReason": "Contract cancelled due to buyer request",
    "approval": {
      "type": "CANCELLED",
      "status": "PENDING",
      "requiresApprovalFrom": "ADMIN"
    }
  },
  "Type": "CANCEL_CONTRACT_SUCCESS"
}
```

**Note**:

- Status kontrak tetap tidak berubah (contoh: `NEED_RESPONSE`).
- Hanya field approval workflow yang diupdate menjadi PENDING.
- ADMIN perlu melakukan translate terlebih dahulu.
- Setelah translate, CS akan melakukan approval final dan mengubah status menjadi CANCELLED.

---

# Get Contract History

## Endpoint

```
GET /v1/bo/contracts/{contractId}/history
```

## Deskripsi

Mengambil riwayat perubahan status dan aktivitas kontrak untuk ditampilkan di Tab Riwayat.

## Path Parameters

| Parameter    | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| `contractId` | uuid | Yes      | ID kontrak  |

## Query Parameters

| Parameter | Type    | Required | Default | Description                                                                        |
| --------- | ------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| `page`    | integer | Tidak    | 1       | Nomor halaman                                                                      |
| `limit`   | integer | Tidak    | 10      | Jumlah data per halaman (>= 1). Jika tidak dikirim atau invalid akan default ke 10 |

## Validation Rules

- `contractId` must be valid UUID format
- `page` must be >= 1 (nilai < 1 otomatis dipaksa menjadi 1)
- `limit` must be integer >= 1 (nilai invalid akan menggunakan default 10)
- Contract must exist in database
- User must have appropriate role to view history

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Riwayat kontrak berhasil diambil"
  },
  "Data": {
    "total": 8,
    "totalPages": 1,
    "currentPage": 1,
    "items": [
      {
        "lastUpdate": "2025-11-12T03:15:00.000Z",
        "activity": "Approve",
        "admin": "GM",
        "idPermintaanKontrak": "INQ/20251107/MPP/000123",
        "masaBerlaku": "01/12/2025 - 30/11/2026",
        "statusApproval": "Approved",
        "detail": true,
        "oldStatus": "AWAITING_FINAL_APPROVAL",
        "newStatus": "WAITING_PHYSICAL_CONTRACT",
        "notes": "Approved by GM"
      }
    ]
  },
  "Type": "GET_CONTRACT_HISTORY"
}
```

### Struktur Item

| Field                 | Description                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `lastUpdate`          | Timestamp perubahan (`changedAt`) dalam format ISO 8601                                                  |
| `activity`            | Aktivitas hasil mapping status (`Create`, `Update Status`, `Approve`, `Reject`)                          |
| `admin`               | Peran yang melakukan perubahan (Admin, Seller, Buyer, GM, System)                                        |
| `idPermintaanKontrak` | Nomor inquiry kontrak (mis. `INQ/...`)                                                                   |
| `masaBerlaku`         | Periode kontrak dalam format `DD/MM/YYYY - DD/MM/YYYY`                                                   |
| `statusApproval`      | Status approval ringkas: `Need Approval`, `Approved`, `Rejected`, `Expired`, `Proses Validasi Kontrak`   |
| `detail`              | Boolean menandakan apakah kontrak memiliki detail produk (status history akan menampilkan tombol detail) |
| `oldStatus`           | Status sebelum perubahan (null untuk record pertama)                                                     |
| `newStatus`           | Status setelah perubahan                                                                                 |
| `notes`               | Catatan tambahan (misal alasan reject/cancel)                                                            |

> Catatan: `statusApproval` otomatis mempertimbangkan tanggal akhir kontrak (expired) dan status approval terkini yang tersimpan di table history.

---

# GM Approval

## Endpoint

```
POST /v1/bo/contracts/{contractId}/gm-approval
```

## Deskripsi

GM memberikan final approval atau rejection untuk kontrak.

**CATATAN PENTING**:

- Main contract status **TIDAK BERUBAH** secara otomatis saat GM approve/reject
- Hanya CS yang dapat mengubah main contract status
- GM approval/rejection akan update approval tracking fields dan menunggu CS untuk mengubah status

## Path Parameters

| Parameter    | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| `contractId` | uuid | Yes      | ID kontrak  |

## Request Body

```json
{
  "decision": "approve",
  "notes": "Final approval granted by GM"
}
```

| Field      | Type   | Required                  | Description                                   |
| ---------- | ------ | ------------------------- | --------------------------------------------- |
| `decision` | string | Ya                        | Tipe keputusan: "approve" atau "reject"       |
| `notes`    | string | Ya (jika decision=reject) | Catatan untuk keputusan (minimal 10 karakter) |

## Validation Rules

- Contract harus dalam status: `NEED_RESPONSE`, `NEGOTIATION_PROCESS`, `AWAITING_FINAL_APPROVAL`, atau `CANCELLED`
- `decision` harus "approve" atau "reject"
- Jika `decision` = "reject", `notes` wajib diisi minimal 10 karakter
- GM role required

## Response Success - Approved (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Kontrak berhasil di-approve oleh GM"
  },
  "Data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "inquiryNumber": "INQ/20251107/MPP/000123",
    "contractNumber": "CTR/20251107/MPP/000098",
    "status": "NEED_RESPONSE",
    "approvedBy": "gm@muatparts.com",
    "approvedAt": "2025-11-07T17:00:00Z",
    "approval": {
      "type": "FINAL_APPROVAL",
      "status": "APPROVED",
      "requiresApprovalFrom": "CS"
    },
    "nextStep": "Menunggu CS untuk mengubah status sesuai kebutuhan"
  },
  "Type": "GM_APPROVAL_SUCCESS"
}
```

**Note**: Status kontrak tetap tidak berubah (contoh: `NEED_RESPONSE`). Hanya field approval workflow yang diupdate. CS perlu mengubah status secara manual sesuai keputusan bisnis.

## Response Success - Rejected (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Kontrak ditolak oleh GM"
  },
  "Data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "inquiryNumber": "INQ/20251107/MPP/000123",
    "status": "NEED_RESPONSE",
    "rejectedBy": "gm@muatparts.com",
    "rejectedAt": "2025-11-07T17:00:00Z",
    "rejectionNotes": "Nilai kontrak melebihi batas approval",
    "approval": {
      "type": "FINAL_APPROVAL",
      "status": "REJECTED",
      "requiresApprovalFrom": "CS"
    },
    "nextStep": "Menunggu CS untuk mengubah status sesuai kebutuhan"
  },
  "Type": "GM_REJECTION_SUCCESS"
}
```

**Note**: Status kontrak tetap tidak berubah (contoh: `NEED_RESPONSE`). Hanya field approval workflow yang diupdate. CS perlu mengubah status secara manual sesuai keputusan bisnis.

---

# Upload Attachment

## Endpoint

```
POST /v1/bo/contracts/{contractId}/attachments
```

## Deskripsi

Upload attachment kontrak oleh admin atau GM.

## Path Parameters

| Parameter    | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| `contractId` | uuid | Yes      | ID kontrak  |

## Request Body (Multipart Form Data)

| Field                    | Type   | Required | Description                                       |
| ------------------------ | ------ | -------- | ------------------------------------------------- |
| `file`                   | file   | Ya       | File attachment (PDF/DOC/DOCX/XLS/XLSX, max 10MB) |
| `description`            | string | Ya       | Deskripsi attachment (5-200 karakter)             |
| `descriptionTranslation` | string | Tidak    | Deskripsi dalam bahasa Indonesia (optional)       |

## Validation Rules

- File harus PDF, DOC, DOCX, XLS, atau XLSX format
- File size maksimal 10MB
- `description` minimum 5 characters, maximum 200 characters
- Admin atau GM role required
- Contract must exist
- Duplicate file names are not allowed

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Attachment berhasil diupload"
  },
  "Data": {
    "id": "attachment-uuid-123",
    "contractId": "550e8400-e29b-41d4-a716-446655440000",
    "fileName": "contract_attachment.pdf",
    "fileUrl": "https://storage.muatparts.com/contracts/attachments/attachment-123.pdf",
    "description": "Contract attachment document",
    "uploadedBy": "admin@muatparts.com",
    "uploadedAt": "2025-11-07T16:00:00Z"
  },
  "Type": "UPLOAD_ATTACHMENT_SUCCESS"
}
```

---

# Delete Attachment

## Endpoint

```
DELETE /v1/bo/contracts/{contractId}/attachments/{attachmentId}
```

## Deskripsi

Menghapus attachment kontrak (soft delete) oleh admin atau GM.

## Path Parameters

| Parameter      | Type | Required | Description   |
| -------------- | ---- | -------- | ------------- |
| `contractId`   | uuid | Yes      | ID kontrak    |
| `attachmentId` | uuid | Yes      | ID attachment |

## Validation Rules

- Attachment must exist
- Attachment must belong to the contract
- Admin atau GM role required
- Contract must exist

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Attachment berhasil dihapus"
  },
  "Data": {
    "id": "attachment-uuid-123",
    "deletedAt": "2025-11-07T16:00:00Z",
    "deletedBy": "admin@muatparts.com"
  },
  "Type": "DELETE_ATTACHMENT_SUCCESS"
}
```

## Error Responses

### 403 Forbidden

```json
{
  "Message": {
    "Code": 403,
    "Text": "Forbidden"
  },
  "Error": {
    "code": "FORBIDDEN",
    "message": "Only admin or GM can perform this action"
  },
  "Type": "DELETE_ATTACHMENT_ERROR"
}
```

### 404 Not Found

```json
{
  "Message": {
    "Code": 404,
    "Text": "Attachment not found"
  },
  "Error": {
    "code": "NOT_FOUND",
    "message": "Attachment with ID attachment-uuid-123 not found"
  },
  "Type": "DELETE_ATTACHMENT_ERROR"
}
```

---

# Upload PI Document

## Endpoint

```
POST /v1/bo/contracts/{contractId}/pi-documents/upload
```

## Deskripsi

Upload dokumen PI (Proforma Invoice) untuk produk Lartas.

## Path Parameters

| Parameter    | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| `contractId` | uuid | Yes      | ID kontrak  |

## Request Body (Multipart Form Data)

| Field         | Type   | Required | Description                     |
| ------------- | ------ | -------- | ------------------------------- |
| `file`        | file   | Ya       | File dokumen PI (PDF, max 10MB) |
| `description` | string | Tidak    | Deskripsi dokumen PI (optional) |

## Validation Rules

- File harus PDF format
- File size maksimal 10MB
- Contract harus memiliki produk Lartas
- Admin atau GM role required
- Contract must exist

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "PI document berhasil diupload"
  },
  "Data": {
    "id": "pi-doc-uuid-123",
    "contractId": "550e8400-e29b-41d4-a716-446655440000",
    "fileName": "proforma_invoice.pdf",
    "fileUrl": "https://storage.muatparts.com/contracts/pi/pi-123.pdf",
    "description": "Proforma Invoice Document",
    "isVerified": false,
    "uploadedBy": "admin@muatparts.com",
    "uploadedAt": "2025-11-07T16:00:00Z"
  },
  "Type": "UPLOAD_PI_DOCUMENT_SUCCESS"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "Message": {
    "Code": 400,
    "Text": "Validation error"
  },
  "Data": {
    "errors": [
      {
        "field": "file",
        "message": "Only PDF files are allowed",
        "value": null
      }
    ]
  },
  "Type": "VALIDATION_ERROR"
}
```

### 403 Forbidden

```json
{
  "Message": {
    "Code": 403,
    "Text": "Forbidden"
  },
  "Error": {
    "code": "FORBIDDEN",
    "message": "Only admin or GM can perform this action"
  },
  "Type": "UPLOAD_PI_DOCUMENT_ERROR"
}
```

### 404 Not Found

```json
{
  "Message": {
    "Code": 404,
    "Text": "Contract not found"
  },
  "Error": {
    "code": "NOT_FOUND",
    "message": "Contract with ID 550e8400-e29b-41d4-a716-446655440000 not found"
  },
  "Type": "UPLOAD_PI_DOCUMENT_ERROR"
}
```

---

# Delete PI Document

## Endpoint

```
DELETE /v1/bo/contracts/{contractId}/pi-documents/{piDocumentId}
```

## Deskripsi

Menghapus dokumen PI (soft delete) oleh admin atau GM.

## Path Parameters

| Parameter      | Type | Required | Description   |
| -------------- | ---- | -------- | ------------- |
| `contractId`   | uuid | Yes      | ID kontrak    |
| `piDocumentId` | uuid | Yes      | ID dokumen PI |

## Validation Rules

- PI document must exist
- PI document must belong to the contract
- Admin atau GM role required
- Contract must exist

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "PI document berhasil dihapus"
  },
  "Data": {
    "id": "pi-doc-uuid-123",
    "deletedAt": "2025-11-07T16:00:00Z",
    "deletedBy": "admin@muatparts.com"
  },
  "Type": "DELETE_PI_DOCUMENT_SUCCESS"
}
```

## Error Responses

### 403 Forbidden

```json
{
  "Message": {
    "Code": 403,
    "Text": "Forbidden"
  },
  "Error": {
    "code": "FORBIDDEN",
    "message": "Only admin or GM can perform this action"
  },
  "Type": "DELETE_PI_DOCUMENT_ERROR"
}
```

### 404 Not Found

```json
{
  "Message": {
    "Code": 404,
    "Text": "PI document not found"
  },
  "Error": {
    "code": "NOT_FOUND",
    "message": "PI document with ID pi-doc-uuid-123 not found"
  },
  "Type": "DELETE_PI_DOCUMENT_ERROR"
}
```

---

# Verify PI Document

## Endpoint

```
PUT /v1/bo/contracts/{contractId}/pi-documents/{piDocumentId}/verify
```

## Deskripsi

Verifikasi atau unverify dokumen PI oleh admin atau GM.

## Path Parameters

| Parameter      | Type | Required | Description   |
| -------------- | ---- | -------- | ------------- |
| `contractId`   | uuid | Yes      | ID kontrak    |
| `piDocumentId` | uuid | Yes      | ID dokumen PI |

## Request Body

```json
{
  "isVerified": true
}
```

### Request Fields

| Field        | Type    | Required | Description                  |
| ------------ | ------- | -------- | ---------------------------- |
| `isVerified` | boolean | Ya       | Status verifikasi dokumen PI |

## Validation Rules

- PI document must exist
- PI document must belong to the contract
- Admin atau GM role required
- Contract must exist

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "PI document berhasil diverifikasi"
  },
  "Data": {
    "id": "pi-doc-uuid-123",
    "isVerified": true,
    "verifiedBy": "admin@muatparts.com",
    "verifiedAt": "2025-11-07T16:00:00Z"
  },
  "Type": "VERIFY_PI_DOCUMENT_SUCCESS"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "Message": {
    "Code": 400,
    "Text": "Validation error"
  },
  "Data": {
    "errors": [
      {
        "field": "isVerified",
        "message": "isVerified must be a boolean",
        "value": "true"
      }
    ]
  },
  "Type": "VALIDATION_ERROR"
}
```

### 403 Forbidden

```json
{
  "Message": {
    "Code": 403,
    "Text": "Forbidden"
  },
  "Error": {
    "code": "FORBIDDEN",
    "message": "Only admin or GM can perform this action"
  },
  "Type": "VERIFY_PI_DOCUMENT_ERROR"
}
```

### 404 Not Found

```json
{
  "Message": {
    "Code": 404,
    "Text": "PI document not found"
  },
  "Error": {
    "code": "NOT_FOUND",
    "message": "PI document with ID pi-doc-uuid-123 not found"
  },
  "Type": "VERIFY_PI_DOCUMENT_ERROR"
}
```

---

# Translate Attachment Description

## Endpoint

```
POST /v1/bo/contracts/{contractId}/translate
```

## Deskripsi

Menerjemahkan deskripsi attachment dan notes kontrak menggunakan AWS Bedrock.

## Path Parameters

| Parameter    | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| `contractId` | uuid | Yes      | ID kontrak  |

## Request Body

```json
{
  "languageId": "760e8400-e29b-41d4-a716-446655440003"
}
```

### Request Fields

| Field        | Type | Required | Description                      |
| ------------ | ---- | -------- | -------------------------------- |
| `languageId` | uuid | Ya       | ID bahasa target untuk translate |

## Validation Rules

- `languageId` must be valid UUID
- `languageId` must exist in languages table
- Admin atau GM role required
- Contract must exist

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Attachment description berhasil diterjemahkan"
  },
  "Data": {
    "contractId": "550e8400-e29b-41d4-a716-446655440000",
    "languageId": "760e8400-e29b-41d4-a716-446655440003",
    "translatedAt": "2025-11-07T16:00:00Z",
    "translatedBy": "admin@muatparts.com"
  },
  "Type": "TRANSLATE_ATTACHMENT_DESCRIPTION_SUCCESS"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "Message": {
    "Code": 400,
    "Text": "Validation error"
  },
  "Data": {
    "errors": [
      {
        "field": "languageId",
        "message": "Invalid language ID format",
        "value": "invalid-uuid"
      }
    ]
  },
  "Type": "VALIDATION_ERROR"
}
```

### 403 Forbidden

```json
{
  "Message": {
    "Code": 403,
    "Text": "Forbidden"
  },
  "Error": {
    "code": "FORBIDDEN",
    "message": "Only admin or GM can perform this action"
  },
  "Type": "TRANSLATE_ATTACHMENT_DESCRIPTION_ERROR"
}
```

### 404 Not Found

```json
{
  "Message": {
    "Code": 404,
    "Text": "Contract not found"
  },
  "Error": {
    "code": "NOT_FOUND",
    "message": "Contract with ID 550e8400-e29b-41d4-a716-446655440000 not found"
  },
  "Type": "TRANSLATE_ATTACHMENT_DESCRIPTION_ERROR"
}
```

---

# Upload Physical Contract

## Endpoint

```
POST /v1/bo/contracts/{contractId}/physical-contract/upload
```

## Deskripsi

Upload dokumen kontrak fisik oleh admin atau GM.

## Path Parameters

| Parameter    | Type | Required | Description |
| ------------ | ---- | -------- | ----------- |
| `contractId` | uuid | Yes      | ID kontrak  |

## Request Body (Multipart Form Data)

| Field  | Type | Required | Description                                |
| ------ | ---- | -------- | ------------------------------------------ |
| `file` | file | Ya       | File dokumen kontrak fisik (PDF, max 10MB) |

## Validation Rules

- File harus PDF format
- File size maksimal 10MB
- Contract harus dalam status `WAITING_PHYSICAL_CONTRACT`
- Admin atau GM role required
- Contract must exist

## Response Success (200 OK)

```json
{
  "Message": {
    "Code": 200,
    "Text": "Physical contract berhasil diupload"
  },
  "Data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "physicalContractFile": "https://storage.muatparts.com/contracts/physical/contract-123.pdf",
    "uploadedBy": "admin@muatparts.com",
    "uploadedAt": "2025-11-07T16:00:00Z"
  },
  "Type": "UPLOAD_PHYSICAL_CONTRACT_SUCCESS"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "Message": {
    "Code": 400,
    "Text": "Validation error"
  },
  "Data": {
    "errors": [
      {
        "field": "file",
        "message": "File size exceeds 10MB limit",
        "value": null
      }
    ]
  },
  "Type": "VALIDATION_ERROR"
}
```

### 403 Forbidden

```json
{
  "Message": {
    "Code": 403,
    "Text": "Forbidden"
  },
  "Error": {
    "code": "FORBIDDEN",
    "message": "Only admin or GM can perform this action"
  },
  "Type": "UPLOAD_PHYSICAL_CONTRACT_ERROR"
}
```

### 404 Not Found

```json
{
  "Message": {
    "Code": 404,
    "Text": "Contract not found"
  },
  "Error": {
    "code": "NOT_FOUND",
    "message": "Contract with ID 550e8400-e29b-41d4-a716-446655440000 not found"
  },
  "Type": "UPLOAD_PHYSICAL_CONTRACT_ERROR"
}
```

### 409 Conflict

```json
{
  "Message": {
    "Code": 409,
    "Text": "Invalid contract status"
  },
  "Error": {
    "code": "INVALID_STATUS",
    "message": "Physical contract can only be uploaded when status is WAITING_PHYSICAL_CONTRACT",
    "currentStatus": "NEED_RESPONSE"
  },
  "Type": "UPLOAD_PHYSICAL_CONTRACT_ERROR"
}
```
