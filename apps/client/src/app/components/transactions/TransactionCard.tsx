import shortenAddress from '../../utils/shortenAddress';

interface ITransactionsCard {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  amount: string | number;
}

export const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
}: ITransactionsCard) => (
  <div
    className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
  >
    <div className="flex flex-col items-center w-full mt-3">
      <div className="display-flex justify-start w-full mb-6 p-2">
        <a
          href={`https://goerli.etherscan.io/address/${addressFrom}`}
          target="_blank"
          rel="noreferrer"
        >
          <p className="text-white text-base my-2">
            From: {''}
            <span className="text-primary-yellow">
              {shortenAddress(addressFrom)}
            </span>
          </p>
        </a>
        <a
          href={`https://goerli.etherscan.io/address/${addressTo}`}
          target="_blank"
          rel="noreferrer"
        >
          <p className="text-white text-base my-2">
            To:{' '}
            <span className="text-primary-yellow">
              {shortenAddress(addressTo)}
            </span>
          </p>
        </a>
        <p className="text-white text-base my-2">
          Amount: <span className="text-primary-yellow">{amount} ETH</span>
        </p>
        <p className="text-white text-base my-2">
          Message: <span className="text-primary-yellow">{message}</span>
        </p>
        )
      </div>
      <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
        <p className="text-primary-yellow font-bold">{timestamp}</p>
      </div>
    </div>
  </div>
);
