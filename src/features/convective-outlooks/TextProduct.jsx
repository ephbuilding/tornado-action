import { useOutlookTextProductByDayQuery } from "services/convective-outlook-text-products";

export const TextProduct = ({ day }) => {
  const { data } = useOutlookTextProductByDayQuery(day);

  return (
    <section
      id="convective-outlook-text-product"
      className="bg-neutral-200 text-black px-6 py-8 rounded-lg mb-6 mx-auto sm:max-w-min"
    >
      <pre className="whitespace-break-spaces sm:whitespace-pre text-sm mx-auto">
        {data ? data : null}
      </pre>
    </section>
  );
};
