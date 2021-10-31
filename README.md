# Dynamic Form Manager

A Next.js application built on React with TypeScript to build and manage Forms.

### Application functionality:-

-   The application ensure role based access and functionality for both Admin users and End users.

-   The admin user can do the following activities:

    1. Admin can build a dynamic form. And, Edit/delete the created form in future.

    1. Admin can add N number of fields as per the need. Supported fields are **_Text, Paragraph, Number, Email, Phone, Pincode, Checkbox, Radio, Single Dropdown, Multi dropdown & Date_**.

    1. Admin can set fields as required for filling out. And, can make fields hidden from the user and hide them while printing and downloading.

    1. Admit can share the form by providing their emaill address while creating the same. Only allowed user can access the form.

    1. Admin can review all the forms submitted by the end user.

    1. Admin can send those forms as Email and download the same as PDF.

-   The end user can do the following activities:

    1. User can see the forms which have been shared by the Admin.

    1. User can submit the form by providing details specified in the form. And can edit the same in future.

    1. Admin can send those forms as Email and download the same as PDF.

---

### Admin Access:-

- Username: **`admin`**

- Password: **`password`**

### User access:-

> Can be accessed through email address. _**Password is not required**_.

---

### Live demo: [**here**](https://form-manager-b2ysl96vl-rajezz.vercel.app)

---

### Dependencies used:

| Name     | Link                                           | Notes                                   |
| -------- | ---------------------------------------------- | ------------------------------------------ |
| Nextjs   | <https://nextjs.org/>                          | React Framework                            |
| Mui      | <https://mui.com/>                             | For frontend components.                   |
| Axios    | <https://www.npmjs.com/package/axios>          | For communicating with Server through API. |
| jsPDF    | <https://www.npmjs.com/package/jspdf>          | For generating PDF from HTML.              |
| Sendgrid | <https://www.npmjs.com/package/@sendgrid/mail> | Used as Mail delivery system.              |
