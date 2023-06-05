export interface GraficData {
  date:                     number;
  states:                   number;
  positive:                 number | null;
  negative:                 number | null;
  pending:                  number | null;
  hospitalizedCurrently:    number | null;
  hospitalizedCumulative:   number | null;
  inIcuCurrently:           number | null;
  inIcuCumulative:          number | null;
  onVentilatorCurrently:    number | null;
  onVentilatorCumulative:   number | null;
  dateChecked:              string;
  death:                    number | null;
  hospitalized:             number | null;
  totalTestResults:         number;
  lastModified:             string;
  recovered:                null;
  total:                    number;
  posNeg:                   number;
  deathIncrease:            number;
  hospitalizedIncrease:     number;
  negativeIncrease:         number;
  positiveIncrease:         number;
  totalTestResultsIncrease: number;
  hash:                     string;
}
