import { useState } from "react";
import { ArrowRight, Calculator, Handshake, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "../utils/scroll";

// Simulation assumptions supplied in the original calculator, not tax guidance.
const RATES = { gross: 0.008, federal: 0.21, state: 0.0884, commission: 0.1 };

export const PartnerCalculator = () => {
  const { t, i18n } = useTranslation();
  const [employees, setEmployees] = useState("200");
  const [salary, setSalary] = useState("2500");
  const locale = i18n.resolvedLanguage || "en-US";
  const money = (value: number) => new Intl.NumberFormat(locale, {
    style: "currency", currency: "USD",
  }).format(value);
  const percent = (value: number) => new Intl.NumberFormat(locale, {
    style: "percent", maximumFractionDigits: 2,
  }).format(value);
  const count = Number(employees);
  const pay = Number(salary);
  const employeesValid = employees !== "" && Number.isSafeInteger(count) && count >= 0 && count <= 10000000;
  const salaryValid = salary !== "" && Number.isFinite(pay) && pay >= 0 && pay <= 100000000;
  const valid = employeesValid && salaryValid;
  const payroll = valid ? count * pay : 0;
  const gross = payroll * RATES.gross;
  const federal = gross * RATES.federal;
  const state = gross * RATES.state;
  const net = gross - federal - state;
  const commission = net * RATES.commission;
  const amount = (value: number) => valid ? money(value) : "—";
  const inputClass = "w-full min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 tabular-nums outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20";
  const rows = [
    { key: "payroll", value: payroll },
    { key: "gross", value: gross, rate: percent(RATES.gross) },
    { key: "taxes", value: -(federal + state) },
    { key: "federal", value: -federal, rate: percent(RATES.federal), sub: true },
    { key: "state", value: -state, rate: percent(RATES.state), sub: true },
    { key: "net", value: net },
    { key: "commission", value: commission, rate: percent(RATES.commission) },
  ];

  return (
    <section id="partners" aria-labelledby="partners-title" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-32 h-80 w-80 rounded-full bg-blue-100 opacity-60 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Handshake size={18} aria-hidden="true" />{t("partners.eyebrow")}
          </span>
          <h2 id="partners-title" className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">{t("partners.title")}</h2>
          <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">{t("partners.subtitle")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["hr", "accountants", "advisors"].map(key => <span key={key} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">{t(`partners.audience.${key}`)}</span>)}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <div className="grid lg:grid-cols-5">
            <div className="min-w-0 p-6 sm:p-8 lg:col-span-2 lg:p-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600"><Calculator aria-hidden="true" /></div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">{t("partners.calculatorTitle")}</h3>
              <p className="mb-7 text-sm leading-relaxed text-gray-600">{t("partners.calculatorIntro")}</p>
              <div className="space-y-5">
                <div>
                  <label htmlFor="partner-employees" className="mb-2 block text-sm font-semibold text-gray-700">{t("partners.employees")}</label>
                  <input id="partner-employees" type="number" inputMode="numeric" min="0" max="10000000" step="1" value={employees} onChange={e => setEmployees(e.target.value)} className={inputClass} aria-invalid={!employeesValid} aria-describedby={!employeesValid ? "partner-employees-error" : undefined} />
                  {!employeesValid && <p id="partner-employees-error" className="mt-2 text-sm text-red-600">{t("partners.employeesError")}</p>}
                </div>
                <div>
                  <label htmlFor="partner-salary" className="mb-2 block text-sm font-semibold text-gray-700">{t("partners.salary")}</label>
                  <input id="partner-salary" type="number" inputMode="decimal" min="0" max="100000000" step="0.01" value={salary} onChange={e => setSalary(e.target.value)} className={inputClass} aria-invalid={!salaryValid} aria-describedby={`partner-salary-hint${!salaryValid ? " partner-salary-error" : ""}`} />
                  <p id="partner-salary-hint" className="mt-2 text-xs text-gray-500">{t("partners.salaryHint")}</p>
                  {!salaryValid && <p id="partner-salary-error" className="mt-2 text-sm text-red-600">{t("partners.salaryError")}</p>}
                </div>
              </div>
              <div className="mt-7 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-sm leading-relaxed text-gray-600">
                <Users size={20} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" /><p>{t("partners.networkHint")}</p>
              </div>
            </div>

            <div className="min-w-0 bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white sm:p-8 lg:col-span-3 lg:p-10">
              <div role="status" aria-live="polite" aria-atomic="true" className="min-w-0">
                <h3 className="text-sm font-semibold text-blue-100">{t("partners.monthlyCommission")}</h3>
                <p className="my-3 break-words font-montserrat text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">{amount(commission)}</p>
                <p className="text-sm text-blue-100">{t("partners.commissionHint", { rate: percent(RATES.commission) })}</p>
                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
                  <span className="text-sm text-blue-100">{t("partners.annualCommission")}</span>
                  <strong className="min-w-0 break-words text-xl tabular-nums">{amount(commission * 12)}</strong>
                </div>
              </div>
              <details className="mt-6 border-t border-white/20 pt-5">
                <summary className="cursor-pointer rounded text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{t("partners.breakdown")}</summary>
                <dl className="mt-3 text-sm">
                  {rows.map(row => <div key={row.key} className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 border-b border-white/15 py-3 ${row.sub ? "pl-3 text-blue-100" : "font-medium"}`}>
                    <dt>{t(`partners.rows.${row.key}`)}{row.rate && <span className="block text-xs font-normal text-blue-100">{row.rate}</span>}</dt>
                    <dd className="break-words text-right tabular-nums">{amount(row.value)}</dd>
                  </div>)}
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-blue-100">{t("partners.assumptions", { gross: percent(RATES.gross), federal: percent(RATES.federal), state: percent(RATES.state), commission: percent(RATES.commission) })}</p>
              </details>
              <p className="mt-6 text-xs leading-relaxed text-blue-100">{t("partners.disclaimer")}</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-5 border-t border-gray-100 bg-blue-50 px-6 py-6 sm:flex-row sm:items-center sm:px-8 lg:px-10">
            <div><h3 className="font-bold text-gray-900">{t("partners.ctaTitle")}</h3><p className="mt-1 text-sm text-gray-600">{t("partners.ctaText")}</p></div>
            <a href="#contact" onClick={e => { e.preventDefault(); scrollToSection("contact"); document.querySelector<HTMLElement>("#contact input")?.focus({ preventScroll: true }); }} className="inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:w-auto">
              {t("partners.cta")}<ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
